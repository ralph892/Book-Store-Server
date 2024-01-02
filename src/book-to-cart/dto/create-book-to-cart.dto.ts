import { IsNotEmpty, Min } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Cart } from 'src/carts/entities/cart.entity';

export class CreateBookToCartDto {
  bookToCart_id: string;

  @IsNotEmpty()
  book: Book;

  @IsNotEmpty()
  cart: Cart;

  @Min(1)
  quantity: number;
}
