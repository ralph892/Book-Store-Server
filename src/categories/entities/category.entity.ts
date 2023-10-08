import { MinLength } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn({
    type: 'varchar',
    name: 'category_id',
    default: `CT${Date.now()}`,
  })
  category_id: string;

  @Column({
    name: 'category_name',
    nullable: false,
    unique: true,
  })
  @MinLength(3)
  category_name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
