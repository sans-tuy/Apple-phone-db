import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartDto, UpdateCartDto } from '../dto';
import { CartService } from '../service/cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  private logger = new Logger('cart controller');

  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully found.',
    type: CartDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  async getAllCarts() {
    this.logger.log('getAllCarts');
    return await this.cartService.getAllCarts();
  }

  @ApiOperation({ summary: 'Get cart by id' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully found.',
    type: CartDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async getCartById(@Param('id') id: string) {
    this.logger.log('getCartById');
    return await this.cartService.getCartById(id);
  }

  @ApiOperation({ summary: 'Update a cart' })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully updated.',
    type: CartDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  async updateCart(@Param('id') id: string, @Body() data: UpdateCartDto) {
    this.logger.log('updateCart');
    return await this.cartService.updateCart({
      where: { id },
      data: data,
    });
  }

  @ApiOperation({ summary: 'Delete a cart' })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully deleted.',
    type: CartDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  async deleteCart(@Param('id') id: string) {
    this.logger.log('deleteCart');
    return await this.cartService.deleteCart({ id: id });
  }
}
