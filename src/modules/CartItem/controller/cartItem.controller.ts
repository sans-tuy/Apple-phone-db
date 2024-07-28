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
import { CartItemService } from '../service/cartItem.service';
import { CartItemDto, CreateCartItemDto, UpdateCartItemDto } from '../dto';

@ApiTags('Cart Item')
@Controller('CartItem')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
  private logger = new Logger('Cart Item controller');

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been successfully found.',
    type: CartItemDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  async getAllCartItems() {
    this.logger.log('getAllCartItems');
    return await this.cartItemService.getAllCartItems();
  }

  @ApiOperation({ summary: 'Get cart item by id' })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been successfully found.',
    type: CartItemDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async getCartItemById(@Param('id') id: string) {
    this.logger.log('getCartItemById');
    return await this.cartItemService.getCartItemById(id);
  }

  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiResponse({
    status: 201,
    description: 'The cart item has been successfully created.',
    type: CartItemDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async createCartItem(@Body() data: CreateCartItemDto) {
    this.logger.log('createCartItem');
    return await this.cartItemService.createCartItem(data);
  }

  @ApiOperation({ summary: 'Update a cart item' })
  @ApiResponse({
    status: 201,
    description: 'The cart item has been successfully updated.',
    type: CartItemDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  async updateCartItem(
    @Param('id') id: string,
    @Body() data: UpdateCartItemDto,
  ) {
    this.logger.log('updateCartItem');
    return await this.cartItemService.updateCartItem({
      where: { id },
      data: data,
    });
  }

  @ApiOperation({ summary: 'Delete a cart item' })
  @ApiResponse({
    status: 201,
    description: 'The cart item has been successfully deleted.',
    type: CartItemDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  async deleteCartItem(@Param('id') id: string) {
    this.logger.log('deleteCartItem');
    return await this.cartItemService.deleteCartItem({ id: id });
  }
}
