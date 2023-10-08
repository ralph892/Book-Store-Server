import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = this.categoriesRepository.create(createCategoryDto);
      return this.categoriesRepository.save(newCategory);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(search: string | undefined) {
    try {
      if (search) {
        const searchBook = this.categoriesRepository.query(
          'SELECT * FROM category WHERE category_name LIKE ? ',
          [`${search}%`],
        );
        return searchBook;
      }
      return this.categoriesRepository.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category` + updateCategoryDto;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
