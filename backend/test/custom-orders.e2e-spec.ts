import request from 'supertest';
import { createApp, closeApp, cleanDatabase } from './setup';
import { INestApplication } from '@nestjs/common';

describe('CustomOrders (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await closeApp();
  });

  describe('POST /api/custom-orders', () => {
    it('should create a custom order', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/custom-orders')
        .send({
          customerName: 'Juan Pérez',
          customerPhone: '+54 9 11 1234-5678',
          description: 'Quiero un dragón verde con alas moradas',
        })
        .expect(201);

      expect(res.body).toMatchObject({
        customerName: 'Juan Pérez',
        customerPhone: '+54 9 11 1234-5678',
        description: 'Quiero un dragón verde con alas moradas',
        referenceImageUrl: null,
      });
      expect(res.body.id).toBeDefined();
    });

    it('should reject invalid data', async () => {
      await request(app.getHttpServer()).post('/api/custom-orders').send({}).expect(400);
    });

    it('should reject missing required fields', async () => {
      await request(app.getHttpServer()).post('/api/custom-orders').send({ customerName: 'Juan' }).expect(400);
    });
  });

  describe('GET /api/custom-orders', () => {
    it('should return empty list', async () => {
      const res = await request(app.getHttpServer()).get('/api/custom-orders').expect(200);
      expect(res.body).toEqual([]);
    });

    it('should return orders ordered by newest first', async () => {
      await request(app.getHttpServer()).post('/api/custom-orders').send({ customerName: 'Primero', customerPhone: '+54 1', description: 'Primer pedido' }).expect(201);

      // better-sqlite3 datetime('now') has second precision, wait a full second
      await new Promise((r) => setTimeout(r, 1100));

      await request(app.getHttpServer()).post('/api/custom-orders').send({ customerName: 'Segundo', customerPhone: '+54 2', description: 'Segundo pedido' }).expect(201);

      const res = await request(app.getHttpServer()).get('/api/custom-orders').expect(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].customerName).toBe('Segundo');
    });
  });
});
