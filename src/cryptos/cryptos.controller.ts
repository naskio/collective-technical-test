import { Controller, Get, Query } from '@nestjs/common';
import { CryptosService } from './cryptos.service';
import { Crypto } from './entities/crypto.entity';

@Controller('cryptos')
export class CryptosController {
  constructor(private readonly cryptosService: CryptosService) {}

  @Get()
  findAll(@Query('q') q: string): Promise<Crypto[]> {
    if (q) {
      return this.cryptosService.findBySearchQuery(q);
    } else {
      return this.cryptosService.findAll();
    }
  }
}
