import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  firstName: string;

  lastName: string;

  address: string;

  phoneNumber: number;

  @IsEmail()
  email: string;

  avatar: string;
}
