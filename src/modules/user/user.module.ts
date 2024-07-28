import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
