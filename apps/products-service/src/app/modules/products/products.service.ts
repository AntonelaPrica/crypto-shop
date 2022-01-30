import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from '@crypto-shop/services-shared';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntityRepo: Repository<ProductEntity>
  ) {}

  async findById(id: string): Promise<ProductDTO> {
    return this.productEntityRepo.findOne(id);
  }

  async findAll(): Promise<ProductDTO[]> {
    return this.productEntityRepo.find();
  }

  async save(product: ProductDTO): Promise<ProductDTO> {
    const oldProduct = product.id
      ? await this.productEntityRepo.findOne(product.id)
      : null;
    const newProduct = new ProductEntity(
      oldProduct?.id,
      product.name,
      product.description,
      product.basePrice,
      product.currency,
      product.quantity
    );
    return this.productEntityRepo.save(newProduct);
  }

  async remove(id: string): Promise<void> {
    await this.productEntityRepo.delete(id);
  }
}
