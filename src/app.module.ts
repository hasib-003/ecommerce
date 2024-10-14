// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './products/product.module';

@Module({
  imports: [ConfigModule, PrismaModule, AuthModule, UserModule,ProductModule],
})
export class AppModule {}
