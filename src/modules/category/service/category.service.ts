import { Injectable } from '@nestjs/common';
import { Prisma, Category as CategoryModel } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  getAllCategories(): Promise<CategoryModel[]> {
    const category = this.prisma.category.findMany();
    return category;
  }

  getCategoryById(id: string): Promise<CategoryModel | null> {
    const category = this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return category;
  }

  createCategory(data: CreateCategoryDto): Promise<CategoryModel> {
    const category = this.prisma.category.create({
      data,
    });
    return category;
  }

  updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: UpdateCategoryDto;
  }): Promise<CategoryModel> {
    const { where, data } = params;
    const category = this.prisma.category.update({
      where,
      data,
    });
    return category;
  }

  deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryModel> {
    const category = this.prisma.category.delete({
      where,
    });
    return category;
  }
}
