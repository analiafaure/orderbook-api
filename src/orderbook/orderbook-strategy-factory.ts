// orderbook-strategy-factory.ts
import { OrderbookStrategy } from './orderbook-strategy.interface';
import { BinanceStrategy } from './binance/binance-strategy'
import { BitmartStrategy } from './bitmart/bitmart-strategy';
import { Exchange } from './enum/exchange.enum';

export class OrderbookStrategyFactory {
  static createStrategy(exchange: Exchange): OrderbookStrategy {
    switch (exchange) {
      case Exchange.BINANCE:
        return new BinanceStrategy();
      case Exchange.BITMART:
        return new BitmartStrategy();
      default:
        throw new Error('Unsupported exchange');
    }
  }
}
