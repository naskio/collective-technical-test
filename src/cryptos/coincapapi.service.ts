import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Crypto } from './entities/crypto.entity';

/**
 * API for CoinCap
 */
@Injectable()
export class CoinCapApiService {
  private readonly coinCapBaseUrl = 'https://api.coincap.io/v2';
  private readonly numberOfAssets = 150;

  constructor(private httpService: HttpService) {}

  /**
   * get assets
   */
  async getAssets(): Promise<Crypto[]> {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(`${this.coinCapBaseUrl}/assets`, {
        params: {
          limit: this.numberOfAssets,
        },
      }),
    );
    const cryptos: Crypto[] = response.data['data'];
    if (cryptos && cryptos.length) {
      // adding an iconUrl to each crypto
      return cryptos.map((v) => ({
        ...v,
        iconUrl: `https://assets.coincap.io/assets/icons/${v.symbol.toLowerCase()}@2x.png`,
      }));
    }
    return [];
  }
}
