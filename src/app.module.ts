import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Users } from './users/entities/users.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '892002',
      database: 'bookstoredb',
      entities: [Users, Category, Book, Cart],
      synchronize: true,
    }),
    UsersModule,
    CategoriesModule,
    BooksModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
