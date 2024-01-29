import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  price: number;

  @Column('timestamptz', { default: new Date() })
  startDate: Date;

  @Column('timestamptz', { default: null })
  endDate?: Date;

  @Column('bool', { default: false })
  deleted: boolean;

  @ManyToOne(() => Product, (product) => product.prices)
  product: Product;
}
