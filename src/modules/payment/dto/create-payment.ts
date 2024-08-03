import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  EWalletChannelCode,
  PaymentMethodReusability,
  PaymentMethodType,
  PaymentRequestCurrency,
} from 'xendit-node/payment_request/models';

export class CreatePaymentDto {
  @ApiProperty({ description: 'amount of the order' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'currency of the money' })
  @IsString()
  @IsNotEmpty()
  currency: PaymentRequestCurrency;

  @ApiProperty({ description: 'description of the payment' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'referenceId of the payment' })
  @IsString()
  @IsNotEmpty()
  referenceId: string;

  @ApiProperty({ description: 'type of the payment method' })
  @IsNotEmpty()
  @IsString()
  type: PaymentMethodType;

  @ApiProperty({
    description: 'channel code of the ewallet. required for ewallet payment',
  })
  @IsString()
  channelCode: EWalletChannelCode;

  @ApiProperty({ description: 'reusability of the payment' })
  @IsString()
  @IsNotEmpty()
  reusability: PaymentMethodReusability;
}
