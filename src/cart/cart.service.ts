import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
  }

  async addItemToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId },
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        },
      });
    }
  }

  async removeItemFromCart(cartItemId: number) {
      const existingItem = await this.prisma.cartItem.findUnique({
        where: { id: cartItemId },
      });

      if (!existingItem) {
        throw new Error(`Cart item with ID ${cartItemId} does not exist.`);
      }
    console.log(typeof cartItemId);
    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  async getTotalPrice(userId: number) {
    const cart = await this.getCart(userId);
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
