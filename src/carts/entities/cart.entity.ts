import { IsNumber, Min } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryColumn({
    name: 'cart_id',
    type: 'varchar',
    default: `CR${Date.now()}`,
  })
  cart_id: string;

  @Column()
  @IsNumber()
  @Min(0)
  quantity: number;

  @Column()
  @IsNumber()
  @Min(0)
  total: number;

  @ManyToOne(() => Users, (user) => user.carts)
  @JoinColumn({ name: 'user' })
  user: string;

  @ManyToMany(() => Book)
  @JoinTable({
    name: 'books_carts',
    joinColumn: {
      name: 'cart_id',
    },
    inverseJoinColumn: {
      name: 'book_id',
    },
  })
  books: Book[];
}
