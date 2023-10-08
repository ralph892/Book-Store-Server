import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users?search=?
  @Get()
  getUsers(@Query('search') search?: string) {
    return this.usersService.getUsers(search);
  }

  // GET /users/:id
  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }

  // POST /users
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
