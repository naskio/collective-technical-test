import { Test, TestingModule } from '@nestjs/testing';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';

describe('CryptosController', () => {
  let controller: CryptosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptosController],
      providers: [CryptosService],
    }).compile();

    controller = module.get<CryptosController>(CryptosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
