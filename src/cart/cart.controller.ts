import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  addItem(@Body() body, @Request() req) {
    const { productId, quantity } = body;
    return this.cartService.addItemToCart(req.user.userId, productId, quantity);
  }

  @Delete('remove/:cartItemId')
  removeItem(@Param('cartItemId') cartItemId: number) {
    return this.cartService.removeItemFromCart(+cartItemId);
  }

  @Delete('clear')
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }

  @Get('total')
  getTotal(@Request() req) {
    return this.cartService.getTotalPrice(req.user.userId);
  }
}
