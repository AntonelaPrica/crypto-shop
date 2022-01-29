import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtAuthGuard } from './guards/jwt-auth-guard.service';
import { JwtAuthInterceptor } from './interceptors/jwt-auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    JwtAuthGuard,
    JwtAuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    AuthService,
  ],
})
export class UiLibSharedModule {}
