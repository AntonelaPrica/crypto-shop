import { Component, OnInit } from '@angular/core';
import { WebsocketClientService } from './services/websocket-client.service';
import { ProductService } from './services/products.service';

@Component({
  selector: 'crypto-shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private websocketClientService: WebsocketClientService,
    private productsService: ProductService
  ) {}

  ngOnInit() {
    this.websocketClientService.setup();
    this.productsService.setup();
  }
}
