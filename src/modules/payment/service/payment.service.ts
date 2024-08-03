import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createCustomError } from 'src/common/utils/helpers';
import { Xendit } from 'xendit-node';
import { CreatePaymentRequestRequest } from 'xendit-node/payment_request/apis';
import { PaymentRequestListResponse } from 'xendit-node/payment_request/models';
import { CreatePaymentDto } from '../dto/create-payment';

@Injectable()
export class PaymentService {
  private xenditClient: Xendit;
  constructor() {
    this.xenditClient = new Xendit({
      secretKey: process.env.SECRET_API_KEY_XENDIT,
    });
  }
  private readonly logger = new Logger('Payment service');

  async getAllPayments(): Promise<PaymentRequestListResponse> {
    try {
      const payments =
        await this.xenditClient.PaymentRequest.getAllPaymentRequests();
      return payments;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPaymentById(paymentRequestId: string) {
    try {
      const payment =
        await this.xenditClient.PaymentRequest.getPaymentRequestByID({
          paymentRequestId,
        });
      return payment;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPayment(paymentBody: CreatePaymentDto) {
    const {
      amount,
      currency,
      description,
      referenceId,
      type,
      channelCode,
      reusability,
    } = paymentBody;
    try {
      const payload: CreatePaymentRequestRequest = {
        data: {
          amount,
          currency,
          paymentMethod: {
            type,
            ewallet: {
              channelCode,
              channelProperties: {
                successReturnUrl: `${process.env.BASE_API_URL}/payment/success`,
              },
            },
            reusability,
          },
          description,
          referenceId,
        },
      };
      const res =
        await this.xenditClient.PaymentRequest.createPaymentRequest(payload);
      return res;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async payemntSuccess(PaymentSe) {
  //   const {
  //     amount,
  //     currency,
  //     description,
  //     referenceId,
  //     type,
  //     channelCode,
  //     reusability,
  //   } = paymentBody;
  //   try {
  //     const payload: CreatePaymentRequestRequest = {
  //       data: {
  //         amount,
  //         currency,
  //         paymentMethod: {
  //           type,
  //           ewallet: {
  //             channelCode,
  //             channelProperties: {
  //               successReturnUrl: `${process.env.BASE_API_URL}/payment/success`,
  //             },
  //           },
  //           reusability,
  //         },
  //         description,
  //         referenceId,
  //       },
  //     };
  //     const res =
  //       await this.xenditClient.PaymentRequest.createPaymentRequest(payload);
  //     return res;
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || 'Something went wrong',
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
