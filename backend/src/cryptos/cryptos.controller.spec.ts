import { Test, TestingModule } from '@nestjs/testing';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';
import { CoinCapApiService } from './coincapapi.service';
import { CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

describe('CryptosController', () => {
  let controller: CryptosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 3000,
          maxRedirects: 3,
        }),
        CacheModule.register(),
      ],
      controllers: [CryptosController],
      providers: [CryptosService, CoinCapApiService],
    }).compile();
    controller = module.get<CryptosController>(CryptosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
