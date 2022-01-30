import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class CryptonatorService {
  constructor(private httpService: HttpService) {}

  findCryptoPrice(coin: string): Observable<{ price: string }> {
    return this.httpService
      .get('https://api.cryptonator.com/api/ticker/' + coin + '-usd')
      .pipe(map((value) => ({ price: value.data?.ticker?.price })));
  }
}
