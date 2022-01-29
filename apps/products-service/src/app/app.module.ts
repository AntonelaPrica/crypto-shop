import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'shopuser',
      password: 'shoppass',
      database: 'shopproducts',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
