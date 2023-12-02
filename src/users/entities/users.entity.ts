import { IsEmail, IsNumber, Max, Min } from 'class-validator';
import { Cart } from 'src/carts/entities/cart.entity';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({
    name: 'user_id',
    type: 'varchar',
  })
  user_id: string;

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

  @Column({
    name: 'refreshToken',
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
