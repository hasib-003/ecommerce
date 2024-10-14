import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto ,UpdateProductDto} from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
  @Get('')
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productService.getAllProducts(page, limit);
  }

  @Patch(':id')
  updateProduct(@Param('id') id:string ,@Body() updateProductDto: UpdateProductDto){
    return this.productService.updateProduct(+id,updateProductDto);
  }
}
