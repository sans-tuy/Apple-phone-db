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
import { CacheModule } from '@nestjs/cache-manager';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    UserModule,
    CartModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
    AuthModule,
    PaymentModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 60 * 1, // one hours before cache is expired
      max: 100, // max item can store in cache
    }),
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
