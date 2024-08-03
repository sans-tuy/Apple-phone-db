import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common';
import { AbstractConnectRelationManyDto } from 'src/common/dto/abstractRelationMany.dto';

export class ProductDto extends AbstractDto {
  @ApiProperty({ description: 'Name of the product' })
  name: string;
  @ApiProperty({ description: 'url image of the product' })
  image: string;
  @ApiProperty({ description: 'description of the product' })
  description: string;
  @ApiProperty({ description: 'price of the product' })
  price: number;
  @ApiProperty({ description: 'stock of the product' })
  stock: number;
  @ApiProperty({
    description: 'Categories of the product',
    isArray: true,
    type: AbstractConnectRelationManyDto,
  })
  categories: AbstractConnectRelationManyDto[];
}
