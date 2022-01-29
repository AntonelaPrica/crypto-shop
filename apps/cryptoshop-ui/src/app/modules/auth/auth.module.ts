import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtAuthGuard, JwtAuthInterceptor } from '@crypto-shop/ui-lib-shared';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [ReactiveFormsModule, AuthRoutingModule],
  providers: [
    JwtAuthGuard,
    JwtAuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
  ],
  exports: [],
})
export class AuthModule {}
