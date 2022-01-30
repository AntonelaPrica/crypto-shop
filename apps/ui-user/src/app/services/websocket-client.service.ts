import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ReplaySubject } from 'rxjs';
import { ProductDTO } from '@crypto-shop/services-shared';

@Injectable({ providedIn: 'root' })
export class WebsocketClientService {
  onProductChange: ReplaySubject<ProductDTO> = new ReplaySubject<ProductDTO>();

  constructor() {}

  setup(): void {
    const socket = io();
    socket.on('connected', function () {
      console.log('WebsocketClientService Connected');
    });
    socket.on('products-save', (payload) => {
      this.onProductChange.next(payload);
    });
  }
}
