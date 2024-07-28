import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [PrismaModule],
})
export class CategoryModule {}
