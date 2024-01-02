import { Module } from '@nestjs/common';
import { BookToCartService } from './book-to-cart.service';
import { BookToCartController } from './book-to-cart.controller';
import { BookToCart } from './entities/book-to-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookToCart])],
  controllers: [BookToCartController],
  providers: [BookToCartService],
})
export class BookToCartModule {}
