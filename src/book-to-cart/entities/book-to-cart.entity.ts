import { Min } from 'class-validator';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { Book } from 'src/books/entities/book.entity';

@Entity()
export class BookToCart {
  @PrimaryColumn()
  bookToCart_id: string;

  @ManyToOne(() => Book, (book) => book.bookToCarts)
  @JoinColumn({ name: 'book' })
  book: Book;

  @ManyToOne(() => Cart, (cart) => cart.bookToCarts)
  @JoinColumn({ name: 'cart' })
  cart: Cart;

  @Min(1)
  @Column()
  quantity: number;
}
