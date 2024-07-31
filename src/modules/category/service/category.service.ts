import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Category as CategoryModel } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { createCustomError } from 'src/common/utils/helpers';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(): Promise<CategoryModel[]> {
    try {
      const category = await this.prisma.category.findMany();
      return category;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCategoryById(id: string): Promise<CategoryModel | null> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
      });
      return category;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createCategory(data: CreateCategoryDto): Promise<CategoryModel> {
    try {
      const category = await this.prisma.category.create({
        data,
      });
      return category;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: UpdateCategoryDto;
  }): Promise<CategoryModel> {
    try {
      const { where, data } = params;
      const category = await this.prisma.category.update({
        where,
        data,
      });
      return category;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryModel> {
    try {
      const category = await this.prisma.category.delete({
        where,
      });
      return category;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
