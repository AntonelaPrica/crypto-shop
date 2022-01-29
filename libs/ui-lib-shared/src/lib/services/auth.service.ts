import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  LoginResponseDto,
  UserDTO,
  UserRegisterDTO,
} from '@crypto-shop/services-shared';

@Injectable({ providedIn: 'any' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Promise<LoginResponseDto> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return firstValueFrom(
      this.httpClient.post<LoginResponseDto>('/api/auth/login', body)
    );
  }

  register(userDto: UserRegisterDTO): Promise<UserDTO> {
    return firstValueFrom(
      this.httpClient.post<UserDTO>('/api/auth/register', userDto)
    );
  }

  getProfile(): Promise<UserDTO> {
    return firstValueFrom(this.httpClient.get<UserDTO>('/api/auth/profile'));
  }
}
