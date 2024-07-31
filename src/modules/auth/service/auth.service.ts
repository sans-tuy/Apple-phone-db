import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, createCustomError } from 'src/common/utils/helpers';
import { UserDto } from 'src/modules/user/dto';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // method validate user
  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      const isPassMatch = await comparePassword(pass, password);
      if (user && isPassMatch) {
        return result;
      }
      return null;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // method to get jwt token
  async login(user: UserDto) {
    try {
      const payload = { email: user.email, sub: user.id };

      // encode user object to jwt token
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // method to get jwt token after login with google
  async loginWithGoogle(user: any) {
    try {
      let dbUser = await this.userService.getUserByEmail(user.email);
      if (!dbUser) {
        // Create new user if not found
        dbUser = await this.userService.createUser({
          email: user.email,
          name: `${user?.firstName || ''} ${user?.lastName || ''}`,
        });
      }
      const payload = { email: dbUser.email, sub: dbUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
