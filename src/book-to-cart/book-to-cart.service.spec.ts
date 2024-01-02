import { Test, TestingModule } from '@nestjs/testing';
import { BookToCartService } from './book-to-cart.service';

describe('BookToCartService', () => {
  let service: BookToCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookToCartService],
    }).compile();

    service = module.get<BookToCartService>(BookToCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
