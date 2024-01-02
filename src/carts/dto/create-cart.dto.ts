import { IsNotEmpty, Min } from 'class-validator';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
export class CreateCartDto {
  @IsNotEmpty()
  cart_id: string;

  user_id: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty({
    each: true,
  })
  @Min(1, {
    each: true,
  })
  buyQuantities: number[];

  @IsNotEmpty({
    each: true,
  })
  products: CreateBookDto[];
}
