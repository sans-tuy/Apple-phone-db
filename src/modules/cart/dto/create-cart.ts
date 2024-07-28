import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AbstractConnectRelationManyDto } from 'src/common/dto/abstractRelationMany.dto';

export class CreateCartDto {
  @ApiProperty({ description: 'quantity of the total cart' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'author of the cart' })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    description: 'list of the cart items',
    isArray: true,
    type: AbstractConnectRelationManyDto,
  })
  cartItems: AbstractConnectRelationManyDto[];
}
