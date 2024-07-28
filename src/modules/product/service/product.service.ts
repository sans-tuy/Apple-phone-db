import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product as ProductModel } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { createCustomError } from 'src/common/utils/helpers';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  getAllProducts(): Promise<ProductModel[]> {
    try {
      const product = this.prisma.product.findMany({
        include: {
          categories: true,
        },
      });
      return product;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  getProductById(id: string): Promise<ProductModel | null> {
    try {
      const product = this.prisma.product.findUnique({
        where: {
          id: id,
        },
        include: {
          categories: true,
        },
      });
      return product;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  createProduct(data: CreateProductDto): Promise<ProductModel> {
    try {
      const { categories, ...req } = data;
      const product = this.prisma.product.create({
        data: {
          ...req,
          categories: {
            connect: categories,
          },
        },
        include: {
          categories: true,
        },
      });
      return product;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductDto;
  }): Promise<ProductModel> {
    try {
      const { where, data } = params;
      const { categories, ...req } = data;
      const product = this.prisma.product.update({
        where,
        data: {
          ...req,
          categories: {
            set: categories,
          },
        },
        include: {
          categories: true,
        },
      });
      return product;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<ProductModel> {
    try {
      const product = this.prisma.product.delete({
        where,
        include: {
          categories: true,
        },
      });
      return product;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
