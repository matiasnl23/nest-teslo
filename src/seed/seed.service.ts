import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { User } from 'src/auth/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/product-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async runSeed() {
    await this.deleteTables();
    const user = await this.inserUsers();
    await this.insertNewProducts(user);
    return 'Seed executed';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  private async inserUsers() {
    const seedUsers = initialData.users;

    const users: User[] = seedUsers.map(user => this.userRepository.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    }));

    await this.userRepository.save(users);

    return users[0];
  }

  private async insertNewProducts(user: User) {
    const products = initialData.products;

    const insertPromises = products.map((p) => this.productsService.create(p, user));

    await Promise.all(insertPromises);
  }
}
