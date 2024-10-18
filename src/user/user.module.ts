// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controllers';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './userCronJob.service';

@Module({
  imports: [PrismaModule,ScheduleModule.forRoot()],
  controllers: [UserController],
  providers: [UserService,CronService],
  exports: [UserService],
})
export class UserModule {}
