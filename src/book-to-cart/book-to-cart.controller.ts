import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookToCartService } from './book-to-cart.service';
import { CreateBookToCartDto } from './dto/create-book-to-cart.dto';
import { UpdateBookToCartDto } from './dto/update-book-to-cart.dto';

@Controller('book-to-cart')
export class BookToCartController {
  constructor(private readonly bookToCartService: BookToCartService) {}

  @Post()
  create(@Body() createBookToCartDto: CreateBookToCartDto) {
    return this.bookToCartService.create(createBookToCartDto);
  }

  @Get()
  findAll() {
    return this.bookToCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookToCartService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookToCartDto: UpdateBookToCartDto,
  ) {
    return this.bookToCartService.update(+id, updateBookToCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookToCartService.remove(+id);
  }
}
