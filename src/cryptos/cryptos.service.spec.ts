import { Test, TestingModule } from '@nestjs/testing';
import { CryptosService } from './cryptos.service';
import { AxiosResponse } from 'axios';
import * as COIN_CAP_ASSETS_MOCKED_RESPONSE from './mock_data/coincap.assets.mock.json';
import { CoinCapApiService } from './coincapapi.service';
import { Crypto } from './entities/crypto.entity';
import { CacheModule } from '@nestjs/common';

class CoinCapApiServiceMock {
  async getAssets(): Promise<AxiosResponse> {
    return {
      data: COIN_CAP_ASSETS_MOCKED_RESPONSE,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
  }
}

describe('CryptosService', () => {
  let module: TestingModule;
  let service: CryptosService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        {
          provide: CoinCapApiService,
          useClass: CoinCapApiServiceMock,
        },
        CryptosService,
      ],
    }).compile();

    service = module.get<CryptosService>(CryptosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of cryptos', async () => {
      const cryptos: Crypto[] = await service.findAll();
      expect(cryptos).toBeDefined();
      expect(cryptos).toBeTruthy();
      expect(cryptos).toHaveLength(COIN_CAP_ASSETS_MOCKED_RESPONSE.data.length);
    });
  });

  describe('findBySearchQuery', () => {
    it('should return list of cryptos where the name contains the term Coin', async () => {
      const cryptos: Crypto[] = await service.findBySearchQuery('Coin');
      expect(cryptos).toBeDefined();
      expect(cryptos).toBeTruthy();
      expect(cryptos).toHaveLength(21);
      expect(cryptos.length).toBeGreaterThanOrEqual(1);
    });
  });
});
