import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common';

export class CategoryDto extends AbstractDto {
  @ApiProperty({ description: 'Name of the category' })
  name: string;
}
