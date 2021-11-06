import { Controller, Get, Query } from '@nestjs/common';
import { CryptosService } from './cryptos.service';
import { Crypto, CryptoCurrency } from './entities/crypto.entity';
import {
  ApiOkResponse,
  ApiQuery,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('cryptos')
@Controller('cryptos')
export class CryptosController {
  constructor(private readonly cryptosService: CryptosService) {}

  @ApiServiceUnavailableResponse({
    description: 'coincap.io endpoint is unavailable',
  })
  @ApiOkResponse({
    description: 'List of top cryptos',
    type: CryptoCurrency,
    isArray: true,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Search query',
    type: String,
  })
  @Get()
  findAll(@Query('q') q?: string): Promise<Crypto[]> {
    if (q) {
      return this.cryptosService.findBySearchQuery(q);
    } else {
      return this.cryptosService.findAll();
    }
  }
}
