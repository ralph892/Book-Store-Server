import { PartialType } from '@nestjs/mapped-types';
import { CreateBookToCartDto } from './create-book-to-cart.dto';

export class UpdateBookToCartDto extends PartialType(CreateBookToCartDto) {}
