import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/product-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) { }

  async runSeed() {
    await this.insertNewProducts();
    return 'Seed executed';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    // const insertPromises = products.map((p) => this.productsService.create(p));

    // await Promise.all(insertPromises);
  }
}
