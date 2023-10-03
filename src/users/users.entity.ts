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
  })
  username: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  address: string;

  @Column()
  phoneNumber: string;

  @Column({
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column({ default: '' })
  avatar: string;
}
