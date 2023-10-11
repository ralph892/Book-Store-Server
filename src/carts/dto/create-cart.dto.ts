import { IsNotEmpty, IsNumber, Min } from 'class-validator';
export class CreateCartDto {
  @IsNotEmpty()
  id_card: string;

  @IsNotEmpty()
  user: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  total_price: number;
}
