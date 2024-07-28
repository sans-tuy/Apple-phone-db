import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [PrismaModule],
})
export class CartModule {}
