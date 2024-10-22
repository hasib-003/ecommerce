import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...data,
      },
    });
  }
  async updateProduct(
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async getAllProducts(
    page: number,
    limit: number,
    filter?: { category?: string },
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;

    return this.prisma.product.findMany({
      skip: skip,
      take: +limit,
      where: {
        ...(filter?.category && { category: { equals: filter.category } }),
      },
    });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
