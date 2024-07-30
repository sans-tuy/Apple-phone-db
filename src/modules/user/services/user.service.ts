import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { createCustomError, hashPassword } from 'src/common/utils/helpers';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto, UserDto } from '../dto';
import { UserWithPassDto } from '../dto/user-with-pass.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  // get user by id
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    this.logger.log('userById');
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
        include: {
          cart: true,
        },
      });
      if (!user) {
        throw createCustomError('User not found', HttpStatus.NOT_FOUND);
      }
      return plainToInstance(UserDto, user);
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserByEmail(email: CreateUserDto['email']): Promise<User | null> {
    this.logger.log('userById');
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return null;
      }
      return plainToInstance(UserWithPassDto, user);
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers() {
    this.logger.log('getAllUsers');
    try {
      const users = await this.prisma.user.findMany({
        orderBy: {
          name: 'asc',
        },
        include: {
          cart: true,
        },
      });
      return plainToInstance(UserDto, users);
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { password, ...rest } = data;
    this.logger.log('createUser');
    try {
      const createUser = await this.prisma.user.create({
        data: {
          password: password ? await hashPassword(password) : null,
          ...rest,
        },
        include: {
          cart: true,
        },
      });
      return createUser;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    this.logger.log('updateUser');
    try {
      const updateUser = await this.prisma.user.update({
        where: params.where,
        data: params.data,
      });
      return updateUser;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log('deleteUser');
    try {
      const deleteUser = await this.prisma.user.delete({
        where,
      });
      return deleteUser;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
