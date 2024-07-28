import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [PrismaModule],
})
export class ProductModule {}
