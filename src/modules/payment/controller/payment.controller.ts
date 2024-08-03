import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/public.decorator';
import { CreatePaymentDto } from '../dto/create-payment';
import { PaymentService } from '../service/payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  private logger = new Logger('Payment controller');

  @Public()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'The payments has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  async getAllPayments() {
    this.logger.log('getAllPayments');
    return await this.paymentService.getAllPayments();
  }

  @Public()
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiResponse({
    status: 200,
    description: 'The payment has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    this.logger.log('getPaymentById');
    return await this.paymentService.getPaymentById(id);
  }

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'The payment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async createPayment(@Body() data: CreatePaymentDto) {
    this.logger.log('createPayment');
    return await this.paymentService.createPayment(data);
  }

  // TODO need to be maintained
  @ApiOperation({ summary: 'webhook for success payment' })
  @ApiResponse({
    status: 201,
    description: 'The payment has been successfully update.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('success')
  async webhookSuccessPayment(@Body() data: CreatePaymentDto) {
    this.logger.log('createPayment');
    return await this.paymentService.createPayment(data);
  }
}
