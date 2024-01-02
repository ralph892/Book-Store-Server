import { Test, TestingModule } from '@nestjs/testing';
import { BookToCartController } from './book-to-cart.controller';
import { BookToCartService } from './book-to-cart.service';

describe('BookToCartController', () => {
  let controller: BookToCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookToCartController],
      providers: [BookToCartService],
    }).compile();

    controller = module.get<BookToCartController>(BookToCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
