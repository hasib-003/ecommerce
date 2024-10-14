import {  IsEmpty } from 'class-validator';

export class CreateProductDto {
  @IsEmpty()
  name: string;

  @IsEmpty()
  description: string;
  @IsEmpty()
  price: number;
  @IsEmpty()
  stockQuantity: number;
  @IsEmpty()
  category: string;
}
export class UpdateProductDto {
  @IsEmpty()
  name?: string;

  @IsEmpty()
  description?: string;
  @IsEmpty()
  price?: number;
  @IsEmpty()
  stockQuantity?: number;
  @IsEmpty()
  category?: string;
}