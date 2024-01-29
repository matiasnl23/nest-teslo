import { IsDate, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductPriceDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;
}
