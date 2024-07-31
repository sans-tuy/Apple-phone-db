import { HttpStatus, Injectable } from '@nestjs/common';
import { Cart as CartModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateCartDto } from '../dto';
import { createCustomError } from 'src/common/utils/helpers';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCarts(): Promise<CartModel[]> {
    try {
      const cart = await this.prisma.cart.findMany({
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });
      return cart;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCartById(id: string): Promise<CartModel | null> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id: id,
        },
        include: {
          cartItems: true,
        },
      });
      return cart;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCart(params: {
    where: Prisma.CartWhereUniqueInput;
    data: UpdateCartDto;
  }): Promise<CartModel> {
    try {
      const { where, data } = params;
      const { cartItems, ...req } = data;
      const cart = await this.prisma.cart.update({
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
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCart(where: Prisma.CartWhereUniqueInput): Promise<CartModel> {
    try {
      const cart = await this.prisma.cart.delete({
        where,
        include: {
          cartItems: true,
        },
      });
      return cart;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
