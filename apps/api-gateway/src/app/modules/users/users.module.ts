import { Module } from '@nestjs/common';
import { UsersRestController } from './users-rest.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [UsersRestController],
  providers: [],
  exports: [],
})
export class UsersModule {}
