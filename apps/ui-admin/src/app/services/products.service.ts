import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '@crypto-shop/services-shared';
import { firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products: ProductDTO[] = [];

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductDTO[]> {
    return this.httpClient
      .get<ProductDTO[]>('/api/products')
      .pipe(tap((values) => (this._products = values)));
  }

  removeProduct(id: string): Promise<any> {
    console.log('service');
    console.log(this._products);
    return firstValueFrom(this.httpClient.delete(`/api/products/${id}`));
  }

  saveProduct(product: ProductDTO): Promise<ProductDTO> {
    return firstValueFrom(
      this.httpClient.post<ProductDTO>('/api/products/', product)
    );
  }
}
