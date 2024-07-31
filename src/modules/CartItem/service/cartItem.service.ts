import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, CartItem as CartItemModel } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { createCustomError } from 'src/common/utils/helpers';
import { CreateCartItemDto, UpdateCartItemDto } from '../dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCartItems(): Promise<CartItemModel[]> {
    try {
      const cartItem = await this.prisma.cartItem.findMany({
        include: {
          product: true,
        },
      });
      return cartItem;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCartItemById(id: string): Promise<CartItemModel | null> {
    try {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: {
          id: id,
        },
        include: {
          product: true,
        },
      });
      return cartItem;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createCartItem(data: CreateCartItemDto): Promise<CartItemModel> {
    try {
      const cartItem = await this.prisma.cartItem.create({
        data,
        include: {
          product: true,
        },
      });
      return cartItem;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCartItem(params: {
    where: Prisma.CartItemWhereUniqueInput;
    data: UpdateCartItemDto;
  }): Promise<CartItemModel> {
    try {
      const { where, data } = params;
      const { productId, ...req } = data;
      const cartItem = await this.prisma.cartItem.update({
        where,
        data: {
          ...req,
          productId: {
            set: productId,
          },
        },
        include: {
          product: true,
        },
      });
      return cartItem;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCartItem(
    where: Prisma.CartItemWhereUniqueInput,
  ): Promise<CartItemModel> {
    try {
      const cartItem = await this.prisma.cartItem.delete({
        where,
        include: {
          product: true,
        },
      });
      return cartItem;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
