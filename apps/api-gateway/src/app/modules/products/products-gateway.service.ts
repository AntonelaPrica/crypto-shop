import { Inject, Injectable } from '@nestjs/common';
import {
  ProductDTO,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceCommands,
} from '@crypto-shop/services-shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsGatewayService {
  constructor(@Inject(PRODUCTS_SERVICE_NAME) private client: ClientProxy) {}

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
    return firstValueFrom(
      this.client.send({ cmd: ProductsServiceCommands.SAVE_PRODUCT }, product)
    );
  }

  async remove(id: string): Promise<void> {
    return firstValueFrom(
      this.client.send({ cmd: ProductsServiceCommands.DELETE_PRODUCT }, id)
    );
  }
}
