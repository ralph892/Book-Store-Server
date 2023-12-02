import { CreateUserDto } from './../users/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async SignUp(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (userExists.length > 0)
      throw new BadRequestException('User already exists');

    // hash password
    const newPassword = await this.hashData(createUserDto.password);
    const tokens = await this.getTokens(
      createUserDto.user_id,
      createUserDto.email,
    );
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: newPassword,
      refreshToken: tokens.refreshToken,
    });
    await this.updateRefreshToken(newUser.user_id, tokens.refreshToken);
    return tokens;
  }

  async SignIn(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findOneByEmail(createAuthDto.email);
    if (user.length === 0 || user === undefined)
      throw new UnauthorizedException('Can not find the account');
    if ((await compare(createAuthDto.password, user[0].password)) === false)
      throw new UnauthorizedException('The password is not correct');
    const tokens = await this.getTokens(user[0].user_id, user[0].email);
    await this.updateRefreshToken(user[0].user_id, tokens.refreshToken);
    return { tokens, user };
  }

  async LogOut(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async hashData(data: string) {
    const salt = await genSalt();
    return await hash(data, salt);
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('SECRET_ACCESS_TOKEN'),
          expiresIn: '60s',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('SECRET_REFRESH_TOKEN'),
          expiresIn: '1y',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user[0] || !user[0].refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(
      refreshToken,
      user[0].refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user[0].user_id, user[0].email);
    await this.updateRefreshToken(user[0].user_id, tokens.refreshToken);
    return tokens;
  }

  async requestInformation(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user[0] || !user[0].refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(
      refreshToken,
      user[0].refreshToken,
    );
    console.log(refreshTokenMatches);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    return user;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from Google';
    } else {
      const userInfo = {
        user_id: req.user.user_id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phoneNumber: req.user.phoneNumber,
        password: req.user.password,
        refreshToken: req.user.refreshToken,
        address: req.user.address,
      };
      const existUser = await this.usersService.findOneByEmail(userInfo.email);
      if (existUser.length === 0) {
        const tokens = await this.SignUp(userInfo);
        return {
          message: 'Create new User from Google',
          tokens,
        };
      } else {
        const { tokens } = await this.SignIn(userInfo);
        return {
          message: 'Create new User from Google',
          tokens,
        };
      }
    }
  }
}
