import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Request } from 'express';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Req() req: Request) {
    createCartDto.user_id = req.user['sub'];
    try {
      const response = await this.cartsService.create(createCartDto);
      if (response instanceof Error) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
