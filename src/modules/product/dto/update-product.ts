import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AbstractConnectRelationManyDto } from 'src/common/dto/abstractRelationMany.dto';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: 'url image of the product' })
  image?: string;

  @ApiPropertyOptional({ description: 'description of the product' })
  description?: string;

  @ApiPropertyOptional({ description: 'price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @ApiPropertyOptional({ description: 'stock of the product' })
  @IsNumber()
  @IsNotEmpty()
  stock?: number;

  @ApiPropertyOptional({
    description: 'Categories of the product',
    isArray: true,
    type: AbstractConnectRelationManyDto,
  })
  categories?: AbstractConnectRelationManyDto[];
}
