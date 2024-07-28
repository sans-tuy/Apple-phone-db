import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// make a base class for other dtos
export class AbstractDto {
  @ApiProperty({ description: 'Unique identifier of the product' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'created time' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'updated time' })
  @Expose()
  updatedAt: Date;
}
