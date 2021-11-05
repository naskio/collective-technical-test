import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CoinCapApiService } from './coincapapi.service';
import { Crypto } from './entities/crypto.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class CryptosService {
  private readonly assetsCacheKey: string = 'assets';

  constructor(
    private coinCapApiService: CoinCapApiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Crypto[]> {
    // fetching from cache
    let cryptos: Crypto[] | null = await this.cacheManager.get<Crypto[]>(
      this.assetsCacheKey,
    );
    // if not found in cache, fetching from API
    if (cryptos == null) {
      try {
        cryptos = await this.coinCapApiService.getAssets();
      } catch (err) {
        throw new ServiceUnavailableException(err.status, err.message);
      }
      // caching the result
      await this.cacheManager.set(this.assetsCacheKey, cryptos, { ttl: 10 });
    }
    return cryptos;
  }
}
