import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '0156323a-c8e5-4803-a1c7-1c6965788606',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Product name',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    description: 'Product description',
    default: null
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: "text-in-slug",
    description: "Slug for SEO",
    uniqueItems: true
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    default: 0,
    description: "Product stock"
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ["M", "XL", "XXL"],
    description: "Product sizes",
    default: []
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: "women"
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User;

  // images

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
