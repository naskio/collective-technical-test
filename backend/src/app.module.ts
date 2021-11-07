import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptosModule } from './cryptos/cryptos.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [CryptosModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
