// bitmart-strategy.ts
import { OrderbookStrategy } from '../orderbook-strategy.interface';
import axios from 'axios';

export class BitmartStrategy implements OrderbookStrategy {
  private readonly baseUrl = 'https://api-cloud.bitmart.com';
  private readonly cacheDuration = 24 * 60 * 60 * 1000;
  private cache = { pairs: [], timestamp: null };

  async checkPairExists(symbol: string): Promise<boolean> {
    const now = Date.now();
    if (this.cache.pairs.length > 0 && this.cache.timestamp && (now - this.cache.timestamp < this.cacheDuration)) {
      return this.cache.pairs.includes(symbol);
    }
    const response = await axios.get(`${this.baseUrl}/spot/v1/symbols/details`);
    this.cache.pairs = response.data.data.symbols.map((s: any) => s.symbol);
    this.cache.timestamp = now;
    return this.cache.pairs.includes(symbol);
  }

  async fetchOrderbook(symbol: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/spot/quotation/v3/books`, { params: { symbol, limit: 20 } });
    return {
      bids: response.data.data.bids,
      asks: response.data.data.asks,
    };
  }
}
