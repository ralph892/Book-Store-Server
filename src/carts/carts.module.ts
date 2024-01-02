import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { BookToCartModule } from 'src/book-to-cart/book-to-cart.module';
import { BookToCartService } from 'src/book-to-cart/book-to-cart.service';
import { BookToCart } from 'src/book-to-cart/entities/book-to-cart.entity';
import { Book } from 'src/books/entities/book.entity';
import { BooksService } from 'src/books/books.service';
import { BooksModule } from 'src/books/books.module';
// import { BookToCartController } from 'src/book-to-cart/book-to-cart.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    BookToCartModule,
    BooksModule,
    TypeOrmModule.forFeature([BookToCart, Book]),
  ],
  controllers: [CartsController],
  providers: [CartsService, BookToCartService, BooksService],
})
export class CartsModule {}
