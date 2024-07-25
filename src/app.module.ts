import { Module } from '@nestjs/common';
import { OrderbookModule } from './orderbook/orderbook.module';

@Module({
  imports: [OrderbookModule],
})
export class AppModule {}