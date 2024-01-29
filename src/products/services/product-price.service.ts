import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductPriceDto, UpdateProductPriceDto } from '../dto';
import { ProductPrice } from '../entities';

@Injectable()
export class ProductPriceService {
  private readonly logger = new Logger(ProductPriceService.name);

  constructor(
    @InjectRepository(ProductPrice)
    private readonly productPriceRepository: Repository<ProductPrice>,
  ) { }

  async getPriceById(
    productId: string,
    priceId: string,
  ): Promise<ProductPrice> {
    const price = await this.productPriceRepository.findOneBy({
      id: priceId,
      product: {
        id: priceId,
      },
    });

    if (!price)
      throw new NotFoundException(
        `Product price with id ${priceId} of product ${productId} was not found.`,
      );

    return price;
  }

  addPrice(productId: string, createProductPriceDto: CreateProductPriceDto) {
    this.logger.debug({ productId, createProductPriceDto });
    throw new Error('Method not implemented.');
  }

  async updatePrice(
    productId: string,
    priceId: string,
    updateProductPriceDto: UpdateProductPriceDto,
  ) {
    this.logger.debug({ productId, priceId, updateProductPriceDto });
    throw new Error('Method not implemented.');
  }

  async deletePrice(productId: string, priceId: string) {
    const price = await this.getPriceById(productId, priceId);

    try {
      price.deleted = true;
      await this.productPriceRepository.save(price);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
