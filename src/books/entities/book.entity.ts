import { Max, Min } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn({
    name: 'book_id',
    type: 'varchar',
    default: `BK${Date.now()}`,
  })
  book_id: string;

  @Column({
    name: 'title',
    nullable: false,
    unique: true,
  })
  title: string;

  @Min(0)
  @Column({
    name: 'price',
    nullable: false,
    default: 0,
  })
  price: number;

  @Min(0)
  @Max(5)
  @Column({
    name: 'rate',
    nullable: false,
    default: 5,
  })
  rate: number;

  @Column({
    name: 'author',
    nullable: false,
    default: 'Unknown',
  })
  author: string;

  @Column({
    name: 'published_date',
    nullable: false,
    type: 'date',
  })
  published_date: Date;

  @Min(0)
  @Column({
    name: 'quantity',
    nullable: false,
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'image_book',
    default: '',
  })
  image_book: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 999,
    default: '',
  })
  description: string;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'category' })
  category: Category;
}
