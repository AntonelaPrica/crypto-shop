import { Body, Controller, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  ProductDTO,
  ProductsServiceCommands,
} from '@crypto-shop/services-shared';

@Controller('commands')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: ProductsServiceCommands.GET_BY_ID })
  async getById(id: string) {
    return this.productsService.findById(id);
  }

  @MessagePattern({ cmd: ProductsServiceCommands.GET_ALL })
  async getAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: ProductsServiceCommands.SAVE_PRODUCT })
  async save(product: ProductDTO) {
    return this.productsService.save(product);
  }

  @MessagePattern({ cmd: ProductsServiceCommands.DELETE_PRODUCT })
  async removeById(id: string) {
    return this.productsService.remove(id);
  }
}
