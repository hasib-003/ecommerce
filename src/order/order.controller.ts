import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('place')
  placeOrder(@Request() req) {
    return this.orderService.placeOrder(req.user.userId);
  }

  @Get()
  getOrderHistory(@Request() req) {
    return this.orderService.getOrderHistory(req.user.userId);
  }
}
