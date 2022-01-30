import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Sse,
  UseGuards,
} from '@nestjs/common';

import { ProductsGatewayService } from './products-gateway.service';
import { ProductDTO } from '@crypto-shop/services-shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { interval, map, Observable } from 'rxjs';

@Controller('products')
export class ProductsRestController {
  constructor(private readonly productsService: ProductsGatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Body() product: ProductDTO) {
    return this.productsService.save(product);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
