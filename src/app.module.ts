import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './products/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { RedisConfigModule } from './redis/redis.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 20,
    }]),
    ConfigModule,
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    RedisConfigModule,
  ],
  controllers:[AbortController],
  providers:[AppService]
})
export class AppModule {}
