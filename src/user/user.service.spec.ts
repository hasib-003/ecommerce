import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';

const redisToken = 'default_IORedisModuleConnectionToken';

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockRedisService = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let redisService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: redisToken, useValue: mockRedisService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    redisService = module.get(redisToken);

  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password',name:'john doe',address:'dhaka' };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
      prismaService.user.create = jest.fn().mockResolvedValue(userData);

      const result = await userService.create(userData);

      expect(result).toEqual(userData);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { ...userData, password: expect.stringMatching(/^\$2b\$/) },
      });
    });

    it('should throw a ConflictException if email already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
        name: 'john doe',
        address: 'dhaka',
      };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(userData);

      await expect(userService.create(userData)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user = { id: 1, email: 'test@example.com' };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(user);

      const result = await userService.findByEmail('test@example.com');
      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('findAll', () => {
    it('should return users from cache if available', async () => {
      const users = [{ id: 1, email: 'test1@example.com' }];
      redisService.get = jest.fn().mockResolvedValue(JSON.stringify(users));

      const result = await userService.findAll(1, 10);
      expect(result).toEqual(users);
      expect(redisService.get).toHaveBeenCalledWith('users:page:1:limit:10');
    });

    it('should fetch users from the database and cache them if not in Redis', async () => {
      const users = [{ id: 1, email: 'test1@example.com' }];
      redisService.get = jest.fn().mockResolvedValue(null);
      prismaService.user.findMany = jest.fn().mockResolvedValue(users);

      const result = await userService.findAll(1, 10);

      expect(result).toEqual(users);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(redisService.set).toHaveBeenCalledWith(
        'users:page:1:limit:10',
        JSON.stringify(users),
        'EX',
        360,
      );
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, email: 'test@example.com' };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(user);

      const result = await userService.findById(1);
      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const user = { id: 1, email: 'test@example.com' };
      prismaService.user.update = jest.fn().mockResolvedValue(user);

      const result = await userService.update(1, { email: 'new@example.com' });
      expect(result).toEqual(user);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { email: 'new@example.com' },
      });
    });
  });

  describe('delete', () => {
    it('should delete a user successfully', async () => {
      const user = { id: 1, email: 'test@example.com' };
      prismaService.user.delete = jest.fn().mockResolvedValue(user);

      const result = await userService.delete(1);
      expect(result).toEqual(user);
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('updatePassword', () => {
    it('should update user password successfully', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
      };
      prismaService.user.update = jest.fn().mockResolvedValue(user);

      const result = await userService.updatePassword(1, 'hashedpassword');
      expect(result).toEqual(user);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { password: 'hashedpassword' },
      });
    });
  });
});
