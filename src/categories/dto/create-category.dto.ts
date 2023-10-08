import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(2)
  @IsNotEmpty()
  category_id: string;

  @MinLength(3)
  category_name: string;
}
