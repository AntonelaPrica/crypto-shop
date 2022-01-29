/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  PRODUCTS_SERVICE_QUEUE,
  RabbitMQConfig,
  USERS_SERVICE_QUEUE,
} from '@crypto-shop/services-shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RabbitMQConfig.RABBITMQ_URL],
        queue: PRODUCTS_SERVICE_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();
  Logger.log(`Microservice is running on ${PRODUCTS_SERVICE_QUEUE}`);
}

bootstrap();
