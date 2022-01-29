import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterDTO } from '@crypto-shop/services-shared';
import { Router } from '@angular/router';
import { AuthService } from '@crypto-shop/ui-lib-shared';

@Component({
  selector: 'crypto-shop-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    const payload: UserRegisterDTO = this.registerForm.value;
    await this.authService.register(payload);
    await this.router.navigateByUrl('/login');
  }

  async onLoginRedirect() {
    await this.router.navigateByUrl('/login');
  }
}
