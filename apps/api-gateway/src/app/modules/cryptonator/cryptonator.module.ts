import { CryptonatorService } from './cryptonator.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CryptonatorController } from './cryptonator.controller';

@Module({
  imports: [HttpModule],
  controllers: [CryptonatorController],
  providers: [CryptonatorService],
})
export class CryptonatorModule {}
