import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the product' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Quantity of the product' })
  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;

  @ApiProperty({ description: 'Category of the product' })
  @IsNotEmpty()
  @IsString()
  category: string;
}
export class UpdateProductDto {
  @ApiProperty({ description: 'Name of the product', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the product', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the product', required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'StockQuantity of the product', required: false })
  @IsNumber()
  @IsOptional()
  stockQuantity?: number;

  @ApiProperty({
    description: 'Optional category of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;
}
