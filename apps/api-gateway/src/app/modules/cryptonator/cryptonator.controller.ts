import { Controller, Get, Param } from '@nestjs/common';
import { CryptonatorService } from './cryptonator.service';

@Controller('crypto-price')
export class CryptonatorController {
  constructor(private readonly cryptonatorService: CryptonatorService) {}

  @Get(':coin')
  async getCryptoPrice(@Param('coin') coin: string) {
    return this.cryptonatorService.findCryptoPrice(coin);
  }
}
