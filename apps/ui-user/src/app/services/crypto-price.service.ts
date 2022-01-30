import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CryptoPriceService {
  constructor(private httpClient: HttpClient) {}

  getCryptoPrice(currency: string): Promise<any> {
    const queryParams = new HttpParams();
    queryParams.set('coin', currency);
    return firstValueFrom(this.httpClient.get(`/api/crypto-price/${currency}`));
  }
}
