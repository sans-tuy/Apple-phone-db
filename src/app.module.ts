import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/CartItem/cartItem';

@Module({
  imports: [
    UserModule,
    CartModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
