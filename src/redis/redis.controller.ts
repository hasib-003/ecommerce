import { Controller, Get, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly redisService: RedisService) {}

  @Get('set/:key/:value')
  async setCache(@Param('key') key: string, @Param('value') value: string) {
    await this.redisService.setValue(key, value);
    return `Key ${key} set with value ${value}`;
  }

  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.redisService.getValue(key);
    return value ? `Key ${key} has value: ${value}` : `Key ${key} not found`;
  }

  @Get('delete/:key')
  async deleteCache(@Param('key') key: string) {
    const result = await this.redisService.deleteValue(key);
    return result ? `Key ${key} deleted` : `Key ${key} not found`;
  }
}
