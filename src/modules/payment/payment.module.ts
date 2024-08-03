import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './service/payment.service';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [PrismaModule],
})
export class PaymentModule {}
