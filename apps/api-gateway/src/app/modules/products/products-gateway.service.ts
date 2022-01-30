import { Inject, Injectable } from '@nestjs/common';
import {
  ProductDTO,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceCommands,
} from '@crypto-shop/services-shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { WebsocketGateway } from '../shared/websocket.gateway';

@Injectable()
export class ProductsGatewayService {
  constructor(
    @Inject(PRODUCTS_SERVICE_NAME) private client: ClientProxy,
    private websocketGateway: WebsocketGateway
  ) {}

  async findById(id: string): Promise<ProductDTO> {
    return firstValueFrom(
      this.client.send({ cmd: ProductsServiceCommands.GET_BY_ID }, id)
    );
  }

  async findAll(): Promise<ProductDTO[]> {
    return firstValueFrom(
      this.client.send({ cmd: ProductsServiceCommands.GET_ALL }, '')
    );
  }

  async save(product: ProductDTO): Promise<ProductDTO> {
    const savedProductDto = await firstValueFrom(
      this.client.send({ cmd: ProductsServiceCommands.SAVE_PRODUCT }, product)
    );
    this.websocketGateway.emit('products-save', savedProductDto);
    return savedProductDto;
  }

  async remove(id: string): Promise<void> {
    await firstValueFrom(
      this.client.send({ cmd: ProductsServiceCommands.DELETE_PRODUCT }, id)
    );
    this.websocketGateway.emit('products-remove', id);
  }
}
