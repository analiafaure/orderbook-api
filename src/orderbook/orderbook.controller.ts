import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OrderbookService } from './orderbook.service';
import { Exchange } from './exchange.enum';

@Controller('orderbook')
export class OrderbookController {
  constructor(private readonly orderbookService: OrderbookService) {}

  @Get()
  async getOrderbook(
    @Query('exchange') exchange: string,
    @Query('baseCoin') baseCoin: string,
    @Query('quoteCoin') quoteCoin: string,
  ) {
    const normalizedExchange = this.normalizeExchange(exchange);
    return await this.orderbookService.getOrderbook(normalizedExchange, baseCoin, quoteCoin);
  }

  private normalizeExchange(exchange: string): Exchange {
    if (!exchange) {
      throw new BadRequestException('Exchange is required');
    }

    const upperCaseExchange = exchange.toUpperCase();
    if (!(upperCaseExchange in Exchange)) {
      throw new BadRequestException('Unsupported exchange');
    }
    return upperCaseExchange as Exchange;
  }
}

