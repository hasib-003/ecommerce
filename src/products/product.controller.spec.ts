import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controllers';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    createProduct: jest.fn(),
    getAllProducts: jest.fn(),
    updateProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
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
      mockProductService.createProduct.mockResolvedValue(result);

      expect(await controller.createProduct(createProductDto)).toEqual(result);
      expect(mockProductService.createProduct).toHaveBeenCalledWith(
        createProductDto,
      );
    });
  });

  describe('getAllProducts', () => {
    it('should retrieve all products', async () => {
      const result = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 150 },
      ];
      mockProductService.getAllProducts.mockResolvedValue(result);

      expect(await controller.getAllProducts(1, 10)).toEqual(result);
      expect(mockProductService.getAllProducts).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 120,
      };

      const result = { id: 1, ...updateProductDto };
      mockProductService.updateProduct.mockResolvedValue(result);

      expect(await controller.updateProduct('1', updateProductDto)).toEqual(
        result,
      );
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(
        1,
        updateProductDto,
      );
    });
  });
});
