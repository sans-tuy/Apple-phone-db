import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// make a custom error
export const createCustomError = (message: string, status: HttpStatus) => {
  throw new HttpException(message, status);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
