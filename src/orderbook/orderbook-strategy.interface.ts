export interface OrderbookStrategy {
    checkPairExists(symbol: string): Promise<boolean>;
    fetchOrderbook(symbol: string): Promise<any>;
  }
  