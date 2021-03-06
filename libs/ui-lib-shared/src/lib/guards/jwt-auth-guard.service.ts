import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class JwtAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const hasAuth = localStorage.getItem('authorization') !== null;
    if (!hasAuth) {
      await this.router.navigateByUrl('auth', { replaceUrl: true });
    }
    return hasAuth;
  }
}
