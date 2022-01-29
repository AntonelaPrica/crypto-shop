import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@crypto-shop/ui-lib-shared';

@Component({
  selector: 'crypto-shop-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() hasRegisterRouting = true;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (!this.loginForm) {
      return;
    }
    await this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    await this.router.navigateByUrl('/home');
  }

  async onRegisterRedirect() {
    await this.router.navigateByUrl('/register');
  }
}
