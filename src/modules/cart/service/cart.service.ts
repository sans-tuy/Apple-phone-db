import { Injectable } from '@nestjs/common';
import { Cart as CartModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateCartDto } from '../dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  getAllCarts(): Promise<CartModel[]> {
    const cart = this.prisma.cart.findMany({
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return cart;
  }

  getCartById(id: string): Promise<CartModel | null> {
    const cart = this.prisma.cart.findUnique({
      where: {
        id: id,
      },
      include: {
        cartItems: true,
      },
    });
    return cart;
  }

  updateCart(params: {
    where: Prisma.CartWhereUniqueInput;
    data: UpdateCartDto;
  }): Promise<CartModel> {
    const { where, data } = params;
    const { cartItems, ...req } = data;
    const cart = this.prisma.cart.update({
      where,
      data: {
        ...req,
        cartItems: {
          set: cartItems,
        },
      },
      include: {
        cartItems: true,
      },
    });
    return cart;
  }

  deleteCart(where: Prisma.CartWhereUniqueInput): Promise<CartModel> {
    const cart = this.prisma.cart.delete({
      where,
      include: {
        cartItems: true,
      },
    });
    return cart;
  }
}
