// binance-strategy.ts
import { OrderbookStrategy } from '../orderbook-strategy.interface'
import axios from 'axios';

export class BinanceStrategy implements OrderbookStrategy {
  private readonly baseUrl = 'https://api.binance.com';
  private readonly cacheDuration = 24 * 60 * 60 * 1000;
  private cache = { pars: [], timestamp: null };

  async checkPairExists(symbol: string): Promise<boolean> {
    const now = Date.now();
    if (this.cache.pars.length > 0 && this.cache.timestamp && (now - this.cache.timestamp < this.cacheDuration)) {
      return this.cache.pars.includes(symbol);
    }
    const response = await axios.get(`${this.baseUrl}/api/v3/exchangeInfo`);
    this.cache.pars = response.data.symbols.map((s: any) => s.symbol);
    this.cache.timestamp = now;
    return this.cache.pars.includes(symbol);
  }

  async fetchOrderbook(symbol: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/api/v3/depth`, { params: { symbol, limit: 20 } });
    return response.data;
  }
}
