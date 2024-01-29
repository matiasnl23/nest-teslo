import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService, ProductPriceService } from './services';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decoratos/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { GetUser } from 'src/auth/decoratos/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities';
import {
  CreateProductDto,
  CreateProductPriceDto,
  UpdateProductDto,
} from './dto';

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
@Auth()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productPriceService: ProductPriceService,
  ) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 201,
    description: 'Product was created',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiOkResponse({ type: [Product] })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOkResponse({ type: Product })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiOkResponse({ type: Product })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  @Post(':productId/price')
  addPrice(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() createProductPriceDto: CreateProductPriceDto,
  ) {
    return this.productPriceService.addPrice(productId, createProductPriceDto);
  }

  @Patch(':productId/price/:priceId')
  updatePrice(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('priceId', ParseUUIDPipe) priceId: string,
    @Body() updateProductPriceDto: UpdateProductDto,
  ) {
    return this.productPriceService.updatePrice(
      productId,
      priceId,
      updateProductPriceDto,
    );
  }

  @Post(':productId/price/:priceId')
  deletePrice(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('priceId', ParseUUIDPipe) priceId: string,
  ) {
    return this.productPriceService.deletePrice(productId, priceId);
  }
}
