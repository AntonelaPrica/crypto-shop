import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtAuthGuard } from './guards/jwt-auth-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [JwtAuthGuard, AuthService],
})
export class UiLibSharedModule {}
