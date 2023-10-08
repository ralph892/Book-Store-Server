import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const newBook = this.booksRepository.create(createBookDto);
      newBook.published_date = new Date(newBook.published_date);
      return this.booksRepository.save(newBook);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(search: string | undefined) {
    try {
      if (search) {
        const searchBook = this.booksRepository.query(
          'SELECT * FROM book WHERE title LIKE ? ',
          [`${search}%`],
        );
        return searchBook;
      }
      return this.booksRepository.query(
        'SELECT book_id,title,price,rate,author,published_date,quantity,image_book,description,category_name FROM book,category WHERE book.categoryId = category.category_id',
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      if (id != undefined) {
        const book = this.booksRepository.query(
          'SELECT book_id,title,price,rate,author,published_date,quantity,image_book,description,category_name AS category FROM book,category WHERE book.categoryId = category.category_id AND book_id = ?',
          [id],
        );
        return book;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      if (id && updateBookDto) {
        console.log(updateBookDto);
        updateBookDto.published_date = new Date(updateBookDto.published_date);
        const response = await this.booksRepository.update(id, updateBookDto);
        return response;
      } else throw new Error('This book is not exists');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: string) {
    try {
      if (id != undefined) {
        const response = this.booksRepository.query(
          'DELETE FROM book WHERE book_id = ?',
          [id],
        );
        return response;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
