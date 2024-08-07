import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Exchange } from '../../src/orderbook/enum/exchange.enum';

describe('OrderbookController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/orderbook (GET) - Valid BINANCE', () => {
    return request(app.getHttpServer())
      .get(`/orderbook?exchange=${Exchange.BINANCE}&baseCoin=BTC&quoteCoin=USDT`)
      .expect(200)
      .expect(response => {
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body.bids).toHaveLength(20);
        expect(response.body.asks).toHaveLength(20);
      });
  });

  it('/orderbook (GET) - Valid BITMART', () => {
    return request(app.getHttpServer())
      .get(`/orderbook?exchange=${Exchange.BITMART}&baseCoin=BTC&quoteCoin=USDT`)
      .expect(200)
      .expect(response => {
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body.bids).toHaveLength(20);
        expect(response.body.asks).toHaveLength(20);
      });
  });

  it('/orderbook (GET) - Exchange invalid', () => {
    return request(app.getHttpServer())
      .get(`/orderbook?exchange=sarasa&baseCoin=BTC&quoteCoin=USDT`)
      .expect(400)
      .expect(response => {
        expect(response.body.message).toContain('Unsupported exchange');
      });
  });

  it('/orderbook (GET) - Missing query parameters', () => {
    return request(app.getHttpServer())
      .get('/orderbook')
      .expect(400)
      .expect(response => {
        expect(response.body.message).toContain('Exchange is required');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
