import { Module, CacheModule } from '@nestjs/common';
import { CryptosService } from './cryptos.service';
import { CryptosController } from './cryptos.controller';
import { CoinCapApiService } from './coincapapi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 3,
    }),
    CacheModule.register(),
  ],
  controllers: [CryptosController],
  exports: [CryptosService],
  providers: [CoinCapApiService, CryptosService],
})
export class CryptosModule {}
