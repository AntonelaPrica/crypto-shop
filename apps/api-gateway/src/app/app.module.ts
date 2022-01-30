import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { CryptonatorModule } from './modules/cryptonator/cryptonator.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    SharedModule,
    AuthModule,
    CryptonatorModule,
  ],
})
export class AppModule {}
