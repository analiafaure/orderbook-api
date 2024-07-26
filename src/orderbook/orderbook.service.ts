import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Exchange } from './exchange.enum';
import * as moment from 'moment-timezone';

@Injectable()
export class OrderbookService {
  private readonly baseUrls = {
    [Exchange.BINANCE]: 'https://api.binance.com',
    [Exchange.BITMART]: 'https://api-cloud.bitmart.com',
  };

  //se define cache para la durabilidad de los pares
  private cache = {
    [Exchange.BINANCE]: { pars: [], timestamp: null },
    [Exchange.BITMART]: { pars: [], timestamp: null },
  };

  private readonly cacheDuration = 24 * 60 * 60 * 1000; // 24 hours en milisegundos

  async getOrderbook(exchange: Exchange, baseCoin: string, quoteCoin: string) {
    const symbol = exchange === Exchange.BINANCE ? `${baseCoin}${quoteCoin}` : `${baseCoin}_${quoteCoin}`;

    const parExists = await this.checkParExists(exchange, symbol);
    if (!parExists) {
      throw new HttpException('Trading pair does not exist', HttpStatus.BAD_REQUEST);
    }

    const orderbook = await this.fetchOrderbook(exchange, symbol);

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

  private async checkParExists(exchange: Exchange, symbol: string): Promise<boolean> {
    const now = Date.now();
    const cache = this.cache[exchange];

    // chequea si esta disponible en la cache
    if (cache.pars.length > 0 && cache.timestamp && (now - cache.timestamp < this.cacheDuration)) {
      return cache.pars.includes(symbol);
    }

    // Obtener y almacenar pares de cache si la cache esta vacia o caduco
    const response = await axios.get(
      exchange === Exchange.BINANCE
        ? `${this.baseUrls.BINANCE}/api/v3/exchangeInfo`
        : `${this.baseUrls.BITMART}/spot/v1/symbols/details`
    );

    cache.pars = exchange === Exchange.BINANCE
      ? response.data.symbols.map((s: any) => s.symbol)
      : response.data.data.symbols.map((s: any) => s.symbol);

    cache.timestamp = now;
    return cache.pars.includes(symbol);
  }

  private async fetchOrderbook(exchange: Exchange, symbol: string) {
    const response = await axios.get(
      exchange === Exchange.BINANCE
        ? `${this.baseUrls.BINANCE}/api/v3/depth`
        : `${this.baseUrls.BITMART}/spot/quotation/v3/books`,
      { params: { symbol, limit: 20 } }
    );

    if (exchange === Exchange.BINANCE) {
      return response.data;
    } else {
      return {
        bids: response.data.data.bids,
        asks: response.data.data.asks,
      };
    }
  }
}
