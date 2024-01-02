import { BookToCart } from 'src/book-to-cart/entities/book-to-cart.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryColumn({
    name: 'cart_id',
    type: 'varchar',
    default: `CR${Date.now()}`,
  })
  cart_id: string;

  @Column()
  date: Date;

  @ManyToOne(() => Users, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @OneToMany(() => BookToCart, (bookToCart) => bookToCart.cart)
  bookToCarts: BookToCart[];
}
