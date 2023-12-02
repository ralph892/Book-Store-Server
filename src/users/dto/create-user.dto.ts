import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  user_id: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  firstName: string;

  lastName: string;

  @IsNotEmpty()
  address: string;

  phoneNumber: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  refreshToken: string;
}
