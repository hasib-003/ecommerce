import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controllers';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockPrismaService = {
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Mock the PrismaService
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        stockQuantity: 50,
        category: 'Test Category',
      };

      const result = { id: 1, ...createProductDto };
      mockPrismaService.product.create.mockResolvedValue(result);

      expect(await controller.createProduct(createProductDto)).toEqual(result);
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: createProductDto,
      });
    });
  });

  describe('getAllProducts', () => {
    it('should retrieve all products', async () => {
      const result = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 150 },
      ];
      mockPrismaService.product.findMany.mockResolvedValue(result);

      expect(await controller.getAllProducts(1, 10)).toEqual(result);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 120,
      };

      const result = { id: 1, ...updateProductDto };
      mockPrismaService.product.update.mockResolvedValue(result);

      expect(await controller.updateProduct('1', updateProductDto)).toEqual(
        result,
      );
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateProductDto,
      });
    });
  });
});
