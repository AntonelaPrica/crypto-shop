import { Component, OnInit } from '@angular/core';
import { AuthService } from '@crypto-shop/ui-lib-shared';
import { Router } from '@angular/router';

@Component({
  selector: 'crypto-shop-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async onLogout() {
    await this.authService.logout();
    await this.router.navigateByUrl('/auth/login');
  }
}
