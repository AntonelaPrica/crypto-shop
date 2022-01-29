import { Injectable, Logger } from '@nestjs/common';
import { UsersGatewayService } from '../shared/users-gateway.service';
import { UserDTO, UserRegisterDTO } from '@crypto-shop/services-shared';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersGatewayService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDTO | null> {
    return this.usersService.validateUser(email, password);
  }

  async login(user: UserDTO) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userRegisterDTO: UserRegisterDTO): Promise<UserDTO> {
    return this.usersService.save(userRegisterDTO);
  }
}
