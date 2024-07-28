import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdateCartItemDto {
  @ApiPropertyOptional({ description: 'quantity of the cart item' })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ description: 'price of the cart item' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ description: 'id of the product' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
