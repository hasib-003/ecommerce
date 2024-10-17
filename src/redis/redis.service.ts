import { Injectable } from '@nestjs/common';
import { InjectRedis} from '@nestjs-modules/ioredis';
import { Redis as IORedis } from 'ioredis'; 

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: IORedis) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async deleteValue(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
