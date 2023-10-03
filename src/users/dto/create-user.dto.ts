import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

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

  @IsNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;

  avatar: string;
}
