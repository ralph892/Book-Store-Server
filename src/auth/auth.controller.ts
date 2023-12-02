import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { GoogleOAuthGuard } from 'src/common/guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() createAuthDto: CreateAuthDto, @Response() res) {
    const { tokens, user } = await this.authService.SignIn(createAuthDto);
    if (tokens) {
      res.cookie('accessToken', tokens.accessToken, {
        expires: new Date(new Date().getTime() + 5 * 60 * 1000),
        httpOnly: true,
      });
      res.cookie('refreshToken', tokens.refreshToken, {
        expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: false,
      });
    }
    return res.send(user);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const tokens = await this.authService.SignUp(createUserDto);
    return tokens;
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logOut(@Req() req: Request, @Response() res) {
    res.clearCookie('refreshToken');
    const logOutUser = this.authService.LogOut(req.user['sub']);
    return res.send(logOutUser);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() req: Request, @Response() res) {
    const user_id = req.user['sub'];
    const refreshToken = req.user['refreshToken'].slice(3);
    const tokens = await this.authService.refreshToken(user_id, refreshToken);
    if (tokens) {
      res.cookie('accessToken', tokens.accessToken, {
        expires: new Date(new Date().getTime() + 5 * 60 * 1000),
        httpOnly: false,
      });
      res.cookie('refreshToken', tokens.refreshToken, {
        expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: false,
      });
    }
    return res.send(tokens);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('information')
  async requestInformation(@Req() req: Request, @Response() res) {
    console.log(req.user);
    const user_id = req.user['sub'];
    const refreshToken = req.user['refreshToken'].slice(3);
    const userInformation = await this.authService.requestInformation(
      user_id,
      refreshToken,
    );
    return res.send(userInformation);
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google-auth')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req: Request) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google-redirect')
  async googleAuthRedirect(@Req() req: Request, @Response() res) {
    const result = await this.authService.googleLogin(req);
    if (typeof result !== 'string') {
      res.cookie('accessToken', result.tokens.accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        httpOnly: false,
      });
      res.cookie('refreshToken', result.tokens.refreshToken, {
        expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: false,
      });
    }
    res.redirect('http://localhost:3001');
    return result;
  }
}
