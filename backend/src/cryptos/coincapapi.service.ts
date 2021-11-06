import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

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
  getAssets(): Promise<AxiosResponse> {
    return firstValueFrom(
      this.httpService.get(`${this.coinCapBaseUrl}/assets`, {
        params: {
          limit: this.numberOfAssets,
        },
      }),
    );
  }
}
