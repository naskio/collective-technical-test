import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CoinCapApiService } from './coincapapi.service';
import { Crypto, CryptoCurrency } from './entities/crypto.entity';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CryptosService {
  private readonly assetsCacheKey: string = 'assets';

  constructor(
    private coinCapApiService: CoinCapApiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchFromApiThenCacheResult(): Promise<Crypto[]> {
    // fetching from api
    const response = await this.coinCapApiService.getAssets();
    // transforming
    let cryptos: Crypto[] = response.data['data'].map((v) =>
      plainToClass(CryptoCurrency, v, { enableImplicitConversion: true }),
    );
    if (cryptos && cryptos.length) {
      // adding an iconUrl to each crypto
      cryptos = cryptos.map((v) => ({
        ...v,
        iconUrl: `https://assets.coincap.io/assets/icons/${v.symbol.toLowerCase()}@2x.png`,
      }));
      // caching the result for 10s
      await this.cacheManager.set(this.assetsCacheKey, cryptos, { ttl: 10 });
    } else {
      // empty response
      throw new Error('Empty cryptos array');
    }
    return cryptos;
  }

  async findAll(): Promise<Crypto[]> {
    // fetching from cache
    let cryptos: Crypto[] | null = await this.cacheManager.get<Crypto[]>(
      this.assetsCacheKey,
    );
    // if not found in cache, fetching from API and cache
    if (cryptos == null) {
      try {
        cryptos = await this.fetchFromApiThenCacheResult();
      } catch (err) {
        throw new ServiceUnavailableException(err.status, err.message);
      }
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
