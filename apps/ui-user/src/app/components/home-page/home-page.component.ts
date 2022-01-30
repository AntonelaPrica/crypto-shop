import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '@crypto-shop/services-shared';
import { ProductService } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crypto-shop-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products$: Observable<ProductDTO[]> | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }
}
