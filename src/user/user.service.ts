// src/user/user.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import {Redis as IORedis} from 'ioredis'
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,@InjectRedis() private readonly redis:IORedis) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async findAll(page: number, limit: number): Promise<User[]> {
    const cacheKey=`users:page:${page}:limit:${limit}`;
    const cacheData=await this.redis.get(cacheKey);
    if(cacheData){
      console.log('Serve from redis')
      return JSON.parse(cacheData)
    }
    const skip = (page - 1) * limit;
    const users=this.prisma.user.findMany({ skip: skip, take: +limit });
    await this.redis.set(cacheKey,JSON.stringify(users),'EX',3600)
    return users
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async updatePassword(id: number, hashedPassword: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
