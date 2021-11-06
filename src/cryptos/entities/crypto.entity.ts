import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export interface Crypto {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
  explorer: string;
  iconUrl?: string;
}

export class CryptoCurrency implements Crypto {
  @IsNotEmpty()
  id: string;

  @IsInt()
  rank: number;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  supply: number;

  @IsNumber()
  maxSupply: number;

  @IsNumber()
  marketCapUsd: number;

  @IsNumber()
  volumeUsd24Hr: number;

  @IsNumber()
  priceUsd: number;

  @IsNumber()
  changePercent24Hr: number;

  @IsNumber()
  vwap24Hr: number;

  @IsUrl()
  explorer: string;

  @IsOptional()
  iconUrl?: string;
}
