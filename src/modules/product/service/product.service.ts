import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, Product as ProductModel } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { createCustomError } from 'src/common/utils/helpers';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(ProductService.name);

  async getAllProducts(): Promise<ProductModel[]> {
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

  async getProductById(id: string): Promise<ProductModel | null> {
    try {
      // is data product exist on cache
      const cachedProduct: ProductModel = await this.cacheManager.get(id);
      if (cachedProduct) {
        return cachedProduct;
      }
      const product = await this.prisma.product.findUnique({
        where: {
          id: id,
        },
        include: {
          categories: true,
        },
      });

      // save data to cache
      await this.cacheManager.set(id, product);

      return product;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createProduct(data: CreateProductDto): Promise<ProductModel> {
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

  async updateProduct(params: {
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

  async deleteProduct(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<ProductModel> {
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
