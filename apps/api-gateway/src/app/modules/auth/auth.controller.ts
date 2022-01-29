import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Logger,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  LoginResponseDto,
  UserDTO,
  UserRegisterDTO,
} from '@crypto-shop/services-shared';
import { UsersGatewayService } from '../shared/users-gateway.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userGatewayService: UsersGatewayService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO): Promise<UserDTO> {
    return this.authService.register(userRegisterDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }): Promise<UserDTO> {
    return this.userGatewayService.findById(req.user?.userId);
  }
}
