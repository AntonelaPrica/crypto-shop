import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '@crypto-shop/services-shared';
import { ProductService } from '../../services/products.service';
import { CryptoPriceService } from '../../services/crypto-price.service';

@Component({
  selector: 'crypto-shop-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products: ProductDTO[] = [];
  priceInUSD: number = 0;
  popup: boolean = false;

  constructor(
    private productService: ProductService,
    private cryptoPriceService: CryptoPriceService
  ) {}

  ngOnInit() {
    this.productService
      .getAllProducts()
      .subscribe((products) => (this.products = products));
    this.productService.onProductsChange.subscribe(
      (products) => (this.products = products)
    );
    this.productService.onProductDelete.subscribe(
      (products) => (this.products = products)
    );
  }

  async convertToUSD(currency: string, basePrice: number) {
    const cryptoPrice = await this.cryptoPriceService.getCryptoPrice(currency);
    this.priceInUSD = cryptoPrice.price * basePrice;
    this.popup = true;
  }
}
