import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  UserDTO,
  UserRegisterDTO,
  USERS_SERVICE_NAME,
  UsersServiceCommands,
} from '@crypto-shop/services-shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersGatewayService {
  constructor(@Inject(USERS_SERVICE_NAME) private client: ClientProxy) {}

  async findById(id: string): Promise<UserDTO> {
    return firstValueFrom(
      this.client.send({ cmd: UsersServiceCommands.GET_BY_ID }, id)
    );
  }

  async findByEmail(email: string): Promise<UserDTO> {
    return firstValueFrom(
      this.client.send({ cmd: UsersServiceCommands.GET_BY_EMAIL }, email)
    );
  }

  async findAll(): Promise<UserDTO[]> {
    return firstValueFrom(
      this.client.send({ cmd: UsersServiceCommands.GET_ALL }, '')
    );
  }

  async save(user: UserRegisterDTO): Promise<UserDTO> {
    return firstValueFrom(
      this.client.send({ cmd: UsersServiceCommands.SAVE_USER }, user)
    );
  }

  async remove(id: string): Promise<void> {
    return firstValueFrom(
      this.client.send({ cmd: UsersServiceCommands.DELETE_USER }, id)
    );
  }

  async validateUser(email: string, password: string): Promise<UserDTO> {
    return firstValueFrom(
      this.client.send(
        { cmd: UsersServiceCommands.VALIDATE_USER },
        {
          email,
          password,
        }
      )
    );
  }
}
