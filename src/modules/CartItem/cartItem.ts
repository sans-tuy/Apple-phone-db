import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CartItemController } from './controller/cartItem.controller';
import { CartItemService } from './service/cartItem.service';

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
  imports: [PrismaModule],
})
export class CartItemModule {}
