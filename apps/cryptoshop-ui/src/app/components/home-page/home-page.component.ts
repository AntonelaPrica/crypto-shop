import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'crypto-shop-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService) {}
  async ngOnInit() {
    const me = await this.authService.getProfile();
    console.log(me);
  }
}
