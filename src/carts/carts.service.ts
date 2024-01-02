import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { BookToCartService } from 'src/book-to-cart/book-to-cart.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    private bookToCartService: BookToCartService,
    private booksService: BooksService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const { cart_id, user_id, date, products, buyQuantities } = createCartDto;
    if (products.length < 1 || buyQuantities.length < 1)
      return new Error('Do not have any items to purchase');
    const newCart = this.cartsRepository.create({ cart_id, user_id, date });
    for (const key in products) {
      if (Object.prototype.hasOwnProperty.call(products, key)) {
        const product = products[key];
        const quantity = buyQuantities[key];
        const newBookToCart = {
          bookToCart_id: `BTC${date.toString()}`,
          book: { ...product } as Book,
          cart: { ...newCart },
          quantity: quantity,
        };
        const updateQuantityResult = await this.updateQuantity(
          product.book_id,
          quantity,
        );
        if (updateQuantityResult instanceof Error) return updateQuantityResult;
        const result = await this.cartsRepository.save(newCart);
        const createBookToCartResult =
          await this.bookToCartService.create(newBookToCart);
        if (createBookToCartResult instanceof Error)
          return createBookToCartResult;
        return result;
      }
    }
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${updateCartDto} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }

  async updateQuantity(book_id: string, buyQuantity: number) {
    const result = await this.booksService.findOne(book_id);
    if (result === undefined || result.length < 0)
      return new Error('The book does not exists');
    const quantity = result[0].quantity;
    if (quantity <= 0) return new Error('Out of stock');
    const remainQuantity = quantity - buyQuantity;
    return await this.booksService.updateQuantity(book_id, remainQuantity);
  }
}
