import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '@crypto-shop/services-shared';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>('/api/products');
  }
}
