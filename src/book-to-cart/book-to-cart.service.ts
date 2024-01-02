import { Injectable } from '@nestjs/common';
import { CreateBookToCartDto } from './dto/create-book-to-cart.dto';
import { UpdateBookToCartDto } from './dto/update-book-to-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookToCart } from './entities/book-to-cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookToCartService {
  constructor(
    @InjectRepository(BookToCart)
    private bookToCartRepository: Repository<BookToCart>,
  ) {}

  async create(createBookToCartDto: CreateBookToCartDto) {
    try {
      const objDto = {
        bookToCart_id: createBookToCartDto.bookToCart_id,
        book: createBookToCartDto.book.book_id,
        cart: createBookToCartDto.cart.cart_id,
        quantity: createBookToCartDto.quantity,
      };
      const newBookToCart = this.bookToCartRepository.create(
        objDto as unknown as CreateBookToCartDto,
      );
      return this.bookToCartRepository.save(newBookToCart);
    } catch (error) {
      return new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all bookToCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookToCart`;
  }

  update(id: number, updateBookToCartDto: UpdateBookToCartDto) {
    return `This action updates a #${updateBookToCartDto} bookToCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookToCart`;
  }
}
