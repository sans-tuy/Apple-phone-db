import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { AbstractConnectRelationManyDto } from 'src/common/dto/abstractRelationMany.dto';

export class UpdateCartDto {
  @ApiPropertyOptional({ description: 'quantity of the total cart' })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({
    description: 'list of the cart items',
    isArray: true,
    type: AbstractConnectRelationManyDto,
  })
  cartItems: AbstractConnectRelationManyDto[];
}
