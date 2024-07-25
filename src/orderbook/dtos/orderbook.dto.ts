import { IsEnum, IsString } from 'class-validator';
import { Exchange } from '../exchange.enum';

export class GetOrderbookDto {
  @IsEnum(Exchange)
  exchange: Exchange;

  @IsString()
  baseCoin: string;

  @IsString()
  quoteCoin: string;
}