import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  RabbitMQConfig,
  USERS_SERVICE_NAME,
  USERS_SERVICE_QUEUE,
} from '@crypto-shop/services-shared';
import { UsersGatewayService } from './users-gateway.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [RabbitMQConfig.RABBITMQ_URL],
          queue: USERS_SERVICE_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [UsersGatewayService, WebsocketGateway],
  exports: [UsersGatewayService, WebsocketGateway],
})
export class SharedModule {}
