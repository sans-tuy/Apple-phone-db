import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtAuthStrategy } from './jwt/jwt-auth.strategy';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LocalStrategy } from './local/local.strategy';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { GoogleOauthStrategy } from './google/google-oauth.strategy';
import { GoogleOauthGuard } from './google/google-oauth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // global: true,
      secret: process.env.JWT_CONSTANTS,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtAuthStrategy,
    JwtAuthGuard,
    GoogleOauthStrategy,
    GoogleOauthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
