import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { AbstractDto } from 'src/common';

export class CartItemDto extends AbstractDto {
  @ApiProperty({ description: 'quantity of the cart item' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'price of the cart item' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'id of the cart' })
  @IsUUID()
  @IsNotEmpty()
  cartId: string;

  @ApiProperty({ description: 'id of the product' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
