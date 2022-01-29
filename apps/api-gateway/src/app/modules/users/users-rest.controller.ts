import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRegisterDTO } from '@crypto-shop/services-shared';
import { UsersGatewayService } from '../shared/users-gateway.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersRestController {
  constructor(private readonly usersService: UsersGatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Body() user: UserRegisterDTO) {
    return this.usersService.save(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
