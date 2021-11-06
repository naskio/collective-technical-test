import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsInt()
  rank: number;

  @ApiProperty()
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  supply: number;

  @ApiProperty()
  @IsNumber()
  maxSupply: number;

  @ApiProperty()
  @IsNumber()
  marketCapUsd: number;

  @ApiProperty()
  @IsNumber()
  volumeUsd24Hr: number;

  @ApiProperty()
  @IsNumber()
  priceUsd: number;

  @ApiProperty()
  @IsNumber()
  changePercent24Hr: number;

  @ApiProperty()
  @IsNumber()
  vwap24Hr: number;

  @ApiProperty()
  @IsUrl()
  explorer: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;
}
