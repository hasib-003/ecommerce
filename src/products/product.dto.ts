import {  IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  stockQuantity: number;
  @IsNotEmpty()
  category: string;
}
export class UpdateProductDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;
  @IsNotEmpty()
  price?: number;
  @IsNotEmpty()
  stockQuantity?: number;
  @IsNotEmpty()
  category?: string;
}