import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { UserDTO, UserRegisterDTO } from '@crypto-shop/services-shared';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepo: Repository<UserEntity>
  ) {}

  async findById(id: string): Promise<UserDTO> {
    const foundUser = await this.userEntityRepo.findOne(id);
    return this.mapToUserDTO(foundUser);
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const foundUser = await this.userEntityRepo.findOne({ email: email });
    return this.mapToUserDTO(foundUser);
  }

  async validateUserByPassword(
    email: string,
    password: string
  ): Promise<UserDTO | null> {
    const foundUser = await this.userEntityRepo.findOne({ email });
    if (!foundUser) {
      return null;
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? this.mapToUserDTO(foundUser) : null;
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userEntityRepo.find();
    return users.map((user) => this.mapToUserDTO(user));
  }

  async save(user: UserRegisterDTO): Promise<UserDTO> {
    const oldUser = await this.userEntityRepo.findOne(user.id);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserEntity(
      oldUser?.id,
      user.firstname,
      user.lastname,
      user.email,
      hashedPassword
    );
    const savedUser = await this.userEntityRepo.save(newUser);
    return this.mapToUserDTO(savedUser);
  }

  async remove(id: string): Promise<void> {
    await this.userEntityRepo.delete(id);
  }

  private mapToUserDTO(userEntity: UserEntity): UserDTO {
    return {
      id: userEntity.id,
      email: userEntity.email,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
    };
  }
}
