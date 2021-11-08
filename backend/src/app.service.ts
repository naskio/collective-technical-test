import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CryptosService } from './cryptos/cryptos.service';

@Injectable()
export class AppService {
  constructor(private readonly cryptosService: CryptosService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Interval(5000)
  async getLatestCryptosJob() {
    let err;
    let maxRetry = 3;
    do {
      try {
        await this.cryptosService.fetchFromApiThenCacheResult();
        err = false;
      } catch (e) {
        err = true;
        maxRetry -= 1;
      }
    } while (err == true && maxRetry > 0);
  }
}
