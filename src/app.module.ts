import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptosModule } from './cryptos/cryptos.module';

@Module({
  imports: [CryptosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
