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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve the cart for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the cart items for the authenticated user.',
  })
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add an item to the cart' })
  @ApiResponse({
    status: 201,
    description: 'Item has been successfully added to the cart.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({
    description: 'Product ID and quantity to be added to the cart',
  })
  addItem(@Body() body, @Request() req) {
    const { productId, quantity } = body;
    return this.cartService.addItemToCart(req.user.userId, productId, quantity);
  }

  @Delete('remove/:cartItemId')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  @ApiResponse({
    status: 200,
    description: 'Item has been successfully removed from the cart.',
  })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  @ApiParam({
    name: 'cartItemId',
    required: true,
    description: 'ID of the cart item to remove',
    type: Number,
  })
  removeItem(@Param('cartItemId') cartItemId: number) {
    return this.cartService.removeItemFromCart(+cartItemId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear the entire cart' })
  @ApiResponse({
    status: 200,
    description: 'All items have been removed from the cart.',
  })
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Get the total price of items in the cart' })
  @ApiResponse({
    status: 200,
    description: 'Returns the total price of items in the cart.',
  })
  getTotal(@Request() req) {
    return this.cartService.getTotalPrice(req.user.userId);
  }
}
