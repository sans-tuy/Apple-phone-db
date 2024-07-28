import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AbstractConnectRelationManyDto {
  @ApiProperty({
    description: 'ID of the relation table',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
