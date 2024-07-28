import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  name?: string;
}
