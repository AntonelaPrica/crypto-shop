import { Body, Controller, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserRegisterDTO,
  UsersServiceCommands,
} from '@crypto-shop/services-shared';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: UsersServiceCommands.GET_BY_ID })
  async getById(id: string) {
    return this.usersService.findById(id);
  }

  @MessagePattern({ cmd: UsersServiceCommands.GET_BY_EMAIL })
  async getByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: UsersServiceCommands.GET_ALL })
  async getAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: UsersServiceCommands.SAVE_USER })
  async save(user: UserRegisterDTO) {
    return this.usersService.save(user);
  }

  @MessagePattern({ cmd: UsersServiceCommands.DELETE_USER })
  async removeById(id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern({ cmd: UsersServiceCommands.VALIDATE_USER })
  async validateUserByPassword(payload: { email: string; password: string }) {
    return this.usersService.validateUserByPassword(
      payload.email,
      payload.password
    );
  }
}
