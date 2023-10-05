import {
  IsEmail,
  IsNotEmpty,
  // Max,
  // Min,
  MinLength,
} from 'class-validator';

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

  // @Min(100000000, { message: 'The minimum phone number length is 9' })
  // @Max(999999999999, { message: 'The maximum phone number length is 11' })
  phoneNumber: number;

  @IsEmail()
  email: string;

  avatar: string;
}
