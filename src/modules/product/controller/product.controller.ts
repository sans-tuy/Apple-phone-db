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
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dto';
import { ProductService } from '../service/product.service';
import { Public } from 'src/modules/auth/public.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private logger = new Logger('Product controller');

  @Public()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  async getAllProducts() {
    this.logger.log('getAllProducts');
    return await this.productService.getAllProducts();
  }

  @Public()
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    this.logger.log('getProductById');
    return await this.productService.getProductById(id);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    this.logger.log('createProduct');
    return await this.productService.createProduct(data);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully updated.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    this.logger.log('updateProduct');
    return await this.productService.updateProduct({
      where: { id },
      data: data,
    });
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully deleted.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    this.logger.log('deleteProduct');
    return await this.productService.deleteProduct({ id: id });
  }
}
