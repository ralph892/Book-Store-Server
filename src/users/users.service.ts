import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error('Failed to create new user');
    }
  }

  async getUsers(search: string | undefined) {
    try {
      if (search) {
        const searchUsers = this.usersRepository.query(
          'SELECT * FROM users WHERE username LIKE ? ',
          [`${search}%`],
        );
        return searchUsers;
      }
      const allUsers = this.usersRepository.find({});
      return allUsers;
    } catch (error) {
      throw new Error('failed to request users');
    }
  }

  async getOneUser(id: string) {
    try {
      if (id != undefined) {
        const user = this.usersRepository.query(
          'SELECT * FROM users WHERE user_id = ?',
          [id],
        );
        return user;
      }
    } catch (error) {
      throw new Error('failed to request a user');
    }
  }

  async remove(id: string) {
    try {
      if (id != undefined) {
        const response = this.usersRepository.query(
          'DELETE FROM users WHERE user_id = ?',
          [id],
        );
        return response;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
