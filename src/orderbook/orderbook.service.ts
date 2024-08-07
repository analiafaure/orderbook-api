// orderbook.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderbookStrategyFactory } from './orderbook-strategy-factory';
import { Exchange } from './enum/exchange.enum';
import * as moment from 'moment-timezone';

@Injectable()
export class OrderbookService {
  async getOrderbook(exchange: Exchange, baseCoin: string, quoteCoin: string) {
    const strategy = OrderbookStrategyFactory.createStrategy(exchange);
    const symbol = exchange === Exchange.BINANCE ? `${baseCoin}${quoteCoin}` : `${baseCoin}_${quoteCoin}`;

    const parExists = await strategy.checkPairExists(symbol);
    if (!parExists) {
      throw new HttpException('Trading pair does not exist', HttpStatus.BAD_REQUEST);
    }

    const orderbook = await strategy.fetchOrderbook(symbol);

    const bids = orderbook.bids;
    const asks = orderbook.asks;

    if (!bids || !asks) {
      throw new HttpException('Orderbook data is not available', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      timestamp: moment().tz('America/Argentina/Buenos_Aires').format(),
      bids: bids.slice(0, 20),
      asks: asks.slice(0, 20),
    };
  }
}
