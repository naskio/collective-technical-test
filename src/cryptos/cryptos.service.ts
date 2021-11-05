import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CoinCapApiService } from './coincapapi.service';
import { Crypto } from './entities/crypto.entity';

@Injectable()
export class CryptosService {
  constructor(private coinCapApiService: CoinCapApiService) {}

  async findAll(): Promise<Crypto[]> {
    try {
      return this.coinCapApiService.getAssets();
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }
}
