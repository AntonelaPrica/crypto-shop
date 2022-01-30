import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '@crypto-shop/services-shared';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { WebsocketClientService } from './websocket-client.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products: ProductDTO[] = [];
  onProductsChange: ReplaySubject<ProductDTO[]> = new ReplaySubject<
    ProductDTO[]
  >();

  constructor(
    private httpClient: HttpClient,
    private websocketClientService: WebsocketClientService
  ) {}

  getAllProducts(): Observable<ProductDTO[]> {
    return this.httpClient
      .get<ProductDTO[]>('/api/products')
      .pipe(tap((values) => (this._products = values)));
  }

  setup() {
    this.websocketClientService.onProductChange.subscribe((product) => {
      if (!product) {
        return;
      }
      this._products = this._products.filter((p) => p.id !== product.id);
      this._products = this._products.concat([product]);
      this.onProductsChange.next(this._products);
    });
  }
}
