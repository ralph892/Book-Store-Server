import { IsNotEmpty, IsNumber, Max, Min, MinLength } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateBookDto {
  @MinLength(2)
  @IsNotEmpty()
  book_id: string;

  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Min(0)
  @IsNotEmpty()
  price: number;

  @Max(5)
  @Min(0)
  rate: number;

  @IsNotEmpty()
  @MinLength(2)
  author: string;

  @IsNotEmpty()
  published_date: Date;

  @IsNumber()
  @Min(0)
  quantity: number;

  image_book: string;

  description: string;

  category: Category;
}
