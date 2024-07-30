import { Expose } from 'class-transformer';
import { AbstractDto } from 'src/common';

export class UserWithPassDto extends AbstractDto {
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  password: string;
}
