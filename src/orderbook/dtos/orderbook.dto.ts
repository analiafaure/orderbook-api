import { IsEnum, IsString } from 'class-validator';

export class GetOrderbookDto {
  @IsEnum(['BINANCE', 'BITMART'])
  exchange: 'BINANCE' | 'BITMART';

  @IsString()
  baseCoin: string;

  @IsString()
  quoteCoin: string;
}