import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PRODUCTS_SERVICE_NAME,
  PRODUCTS_SERVICE_QUEUE,
  RabbitMQConfig,
} from '@crypto-shop/services-shared';
import { ProductsRestController } from './products-rest.controller';
import { ProductsGatewayService } from './products-gateway.service';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SharedModule,
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [RabbitMQConfig.RABBITMQ_URL],
          queue: PRODUCTS_SERVICE_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductsRestController],
  providers: [ProductsGatewayService],
  exports: [ProductsGatewayService],
})
export class ProductsModule {}
