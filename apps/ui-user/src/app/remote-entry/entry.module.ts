import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent },
    ]),
    ReactiveFormsModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
