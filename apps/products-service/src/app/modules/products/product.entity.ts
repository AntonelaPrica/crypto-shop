import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SupportedCurrency } from '@crypto-shop/services-shared';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  basePrice: number;

  @Column({
    type: 'enum',
    enum: SupportedCurrency,
    default: SupportedCurrency.USD,
  })
  currency: string;

  @Column()
  quantity: number;

  constructor(
    id: string,
    name: string,
    description: string,
    basePrice: number,
    currency: string,
    quantity: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.basePrice = basePrice;
    this.currency = currency;
    this.quantity = quantity;
  }
}
