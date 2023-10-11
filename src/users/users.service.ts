import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/config/firebase.config';

@Injectable()
export class UsersService {
  url: string;
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      if (this.url !== '') newUser.avatar = this.url;
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error('Failed to create new user');
    }
  }

  async upload(file: Express.Multer.File) {
    try {
      if (file) {
        const fileRef = ref(storage, `images/users/${file.originalname}`);
        const metadata = {
          contentType: file.mimetype,
        };
        try {
          if (await getDownloadURL(fileRef))
            throw new Error('This file already exists');
        } catch (error) {
          await uploadBytes(fileRef, file.buffer, metadata);
          this.url = await getDownloadURL(fileRef);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(search: string | undefined) {
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

  async findOne(id: string) {
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
