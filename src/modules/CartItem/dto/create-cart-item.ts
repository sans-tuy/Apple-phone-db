import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateCartItemDto {
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
