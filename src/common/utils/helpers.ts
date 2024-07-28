import { HttpException, HttpStatus } from '@nestjs/common';

// make a custom error
export const createCustomError = (message: string, status: HttpStatus) => {
  throw new HttpException(message, status);
};
