import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Product, ProductImage, ProductPrice } from './entities';
import { ProductPriceService, ProductsService } from './services';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductPriceService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, ProductPrice]),
    AuthModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule { }
