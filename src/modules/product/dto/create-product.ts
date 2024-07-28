import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AbstractConnectRelationManyDto } from 'src/common/dto/abstractRelationMany.dto';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'url image of the product' })
  image: string;

  @ApiProperty({ description: 'description of the product' })
  description: string;

  @ApiProperty({ description: 'price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'stock of the product' })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    description: 'Categories of the product',
    isArray: true,
    type: AbstractConnectRelationManyDto,
  })
  categories: AbstractConnectRelationManyDto[];
}
