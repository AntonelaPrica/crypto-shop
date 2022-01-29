import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCTS_SERVICE_NAME,
  USERS_SERVICE_NAME,
} from '@crypto-shop/services-shared';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppInitService {
  constructor(
    @Inject(PRODUCTS_SERVICE_NAME) private productsClient: ClientProxy,
    @Inject(USERS_SERVICE_NAME) private usersClient: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.usersClient.connect();
    await this.productsClient.connect();
  }
}
