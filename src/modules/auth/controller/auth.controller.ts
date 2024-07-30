import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from '../google/google-oauth.guard';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login using credential, if verified, return jwt token for authorization
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {
    // Guard initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    // Handle successful Google login and return user info or JWT
    return this.authService.loginWithGoogle(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
