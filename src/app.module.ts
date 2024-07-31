import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/CartItem/cartItem';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';
import { RateLimitingMiddleware } from './middleware/rate-limiting.middleware';

@Module({
  imports: [
    UserModule,
    CartModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // add rate limiting user to try login several times (security for brute force attack)
    consumer.apply(RateLimitingMiddleware).forRoutes('auth/login');
  }
}
