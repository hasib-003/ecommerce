import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controllers';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ConflictException } from '@nestjs/common';

const mockUserService = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const userData: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'john doe',
        address: 'dhaka',
      };
      const createUser={
        ...userData,
        id:1,
        createdAt:new Date(),
        updatedAt:new Date(),
      }
      jest.spyOn(userService, 'create').mockResolvedValue(createUser);

      const result = await userController.create(userData);

      expect(result).toMatchObject(userData);
      expect(userService.create).toHaveBeenCalledWith(userData);
    });

    it('should throw a ConflictException if email already exists', async () => {
      const userData: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'john doe',
        address: 'dhaka',
      };
      jest
        .spyOn(userService, 'create')
        .mockRejectedValue(new ConflictException());

      await expect(userController.create(userData)).rejects.toThrow(
        ConflictException,
      );
      expect(userService.create).toHaveBeenCalledWith(userData);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const user = {
        id: userId,
        email: 'test@example.com',
        password: 'hashed_password', 
        name: 'John Doe',
        address: 'Dhaka, Bangladesh',
        createdAt: new Date(), 
        updatedAt: new Date(),
      };
      
      jest.spyOn(userService, 'findById').mockResolvedValue(user);

      const result = await userController.findOne(userId.toString());

      expect(result).toEqual(user);
      expect(userService.findById).toHaveBeenCalledWith(userId);
    });

    it('should return null if user not found', async () => {
      const userId = 1;
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      const result = await userController.findOne(userId.toString());

      expect(result).toBeNull();
      expect(userService.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 2,
          email: 'test@example.com',
          password: 'hashed_password', 
          name: 'John Doe',
          address: 'Dhaka, Bangladesh',
          createdAt: new Date(), 
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await userController.findAll(1, 10);

      expect(result).toEqual(users);
      expect(userService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });


  describe('remove', () => {
    it('should delete a user successfully', async () => {
      const userId = 1;
      const deletedUser = {
        id: userId,
        email: 'test@example.com',
        name: 'John Doe',
        address: 'Dhaka, Bangladesh',
        password: 'hashed_password', 
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(userService, 'delete').mockResolvedValue(deletedUser);

      const result = await userController.remove(userId.toString());

      expect(result).toEqual(deletedUser);
      expect(userService.delete).toHaveBeenCalledWith(userId);
    });
  });
});
