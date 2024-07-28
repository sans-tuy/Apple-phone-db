import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  private logger = new Logger('Category controller');

  @ApiOperation({ summary: 'Get all category' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully found.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  async getAllCategories() {
    this.logger.log('getAllCategories');
    return await this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully found.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    this.logger.log('getCategoryById');
    return await this.categoryService.getCategoryById(id);
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    this.logger.log('createCategory');
    return await this.categoryService.createCategory(data);
  }

  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully updated.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    this.logger.log('updateCategory');
    return await this.categoryService.updateCategory({
      where: { id },
      data: data,
    });
  }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully deleted.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    this.logger.log('deleteCategory');
    return await this.categoryService.deleteCategory({ id: id });
  }
}
