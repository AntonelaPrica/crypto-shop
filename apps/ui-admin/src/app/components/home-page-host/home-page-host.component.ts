import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '@crypto-shop/services-shared';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crypto-shop-home-page',
  templateUrl: './home-page-host.component.html',
  styleUrls: ['./home-page-host.component.scss'],
})
export class HomePageHostComponent implements OnInit {
  products: ProductDTO[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }

  onDeleteProduct(id: string): void {
    console.log(id + 'component');
    this.productService.removeProduct(id).then(() => {
      this.products = this.products.filter((p) => p.id !== id);
    });
  }

  async onCreateProduct() {
    await this.router.navigateByUrl('/product', {
      state: {
        product: null,
        isNewProduct: true,
      },
    });
  }

  async onUpdateProduct(product: ProductDTO) {
    await this.router.navigateByUrl('/product', {
      state: {
        product: product,
        isNewProduct: false,
      },
    });
  }
}
