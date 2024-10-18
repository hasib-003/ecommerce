import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from './user.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly userService: UserService) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    this.logger.debug('Cron job executed - Fetching all users');
    const page = 1;
    const limit = 6;
    const users = await this.userService.findAll(page, limit);
    console.log(users)
    this.logger.debug(`Fetched ${users} users`);
  }
}
