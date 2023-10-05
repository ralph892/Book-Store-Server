import { IsEmail, IsNumber, Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'username',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({ default: 'Unknown' })
  firstName: string;

  @Column({ default: 'Unknown' })
  lastName: string;

  @Column({ name: 'address', nullable: false })
  address: string;

  @IsNumber()
  @Min(100000000, { message: 'The minimum phone number length is 9' })
  @Max(999999999999, { message: 'The maximum phone number length is 11' })
  @Column({
    name: 'phoneNumber',
    nullable: false,
    unique: true,
    type: 'bigint',
  })
  phoneNumber: number;

  @IsEmail()
  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ default: '' })
  avatar: string;
}
