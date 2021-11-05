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
        const response = await this.coinCapApiService.getAssets();
        cryptos = response.data['data'];
        // adding an iconUrl to each crypto
        if (cryptos && cryptos.length) {
          cryptos = cryptos.map((v) => ({
            ...v,
            iconUrl: `https://assets.coincap.io/assets/icons/${v.symbol.toLowerCase()}@2x.png`,
          }));
        } else {
          cryptos = [];
        }
      } catch (err) {
        throw new ServiceUnavailableException(err.status, err.message);
      }
      // caching the result
      await this.cacheManager.set(this.assetsCacheKey, cryptos, { ttl: 10 });
    }
    return cryptos;
  }

  async findBySearchQuery(q: string): Promise<Crypto[]> {
    // fetching all cryptos
    const cryptos = await this.findAll();
    // filtering by search query
    return cryptos.filter((crypto) =>
      Object.entries(crypto).some(
        ([k, v]) =>
          ['name', 'symbol'].some((item) => item == k) &&
          v &&
          String(v).toLowerCase().includes(q.toLowerCase()),
      ),
    );
  }
}
