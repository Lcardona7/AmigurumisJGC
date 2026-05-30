import request from 'supertest';
import { createApp, closeApp, cleanDatabase } from './setup';
import { INestApplication } from '@nestjs/common';

describe('Products (e2e)', () => {
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

  async function seedCategory(name: string, slug: string): Promise<number> {
    const res = await request(app.getHttpServer()).post('/api/categories').send({ name, slug }).expect(201);
    return res.body.id;
  }

  describe('POST /api/products', () => {
    it('should create a product', async () => {
      const categoryId = await seedCategory('Animales', 'animales');

      const res = await request(app.getHttpServer())
        .post('/api/products')
        .send({
          title: 'Osito Crochet',
          description: 'Osito tejido a mano',
          price: 8500,
          images: ['https://example.com/img1.jpg'],
          categoryId,
        })
        .expect(201);

      expect(res.body).toMatchObject({ title: 'Osito Crochet', price: 8500 });
      expect(res.body.id).toBeDefined();
    });

    it('should reject invalid data', async () => {
      await request(app.getHttpServer()).post('/api/products').send({ title: 'Incomplete' }).expect(400);
    });
  });

  describe('GET /api/products', () => {
    it('should return empty list', async () => {
      const res = await request(app.getHttpServer()).get('/api/products').expect(200);
      expect(res.body).toEqual([]);
    });

    it('should return all available products', async () => {
      const cid = await seedCategory('Animales', 'animales');
      await request(app.getHttpServer()).post('/api/products').send({ title: 'Osito', description: 'Desc', price: 100, images: [], categoryId: cid }).expect(201);
      await request(app.getHttpServer()).post('/api/products').send({ title: 'Conejito', description: 'Desc', price: 200, images: [], categoryId: cid }).expect(201);

      const res = await request(app.getHttpServer()).get('/api/products').expect(200);
      expect(res.body).toHaveLength(2);
    });

    it('should respect isAvailable=false', async () => {
      const cid = await seedCategory('Animales', 'animales');
      await request(app.getHttpServer()).post('/api/products').send({ title: 'No disponible', description: 'Desc', price: 100, images: [], categoryId: cid, isAvailable: false }).expect(201);

      const res = await request(app.getHttpServer()).get('/api/products').expect(200);
      expect(res.body).toHaveLength(0);
    });

    it('should filter by categoryId', async () => {
      const cid1 = await seedCategory('Animales', 'animales');
      const cid2 = await seedCategory('Personajes', 'personajes');
      await request(app.getHttpServer()).post('/api/products').send({ title: 'En animales', description: 'Desc', price: 100, images: [], categoryId: cid1 }).expect(201);
      await request(app.getHttpServer()).post('/api/products').send({ title: 'En personajes', description: 'Desc', price: 200, images: [], categoryId: cid2 }).expect(201);

      const res = await request(app.getHttpServer()).get(`/api/products?categoryId=${cid1}`).expect(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe('En animales');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a product by id', async () => {
      const cid = await seedCategory('Animales', 'animales');
      const created = await request(app.getHttpServer()).post('/api/products').send({ title: 'Rana', description: 'Rana adorable', price: 6500, images: ['img1.jpg', 'img2.jpg'], categoryId: cid }).expect(201);

      const res = await request(app.getHttpServer()).get(`/api/products/${created.body.id}`).expect(200);
      expect(res.body.title).toBe('Rana');
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer()).get('/api/products/999').expect(404);
    });
  });

  describe('PATCH /api/products/:id', () => {
    it('should update a product', async () => {
      const cid = await seedCategory('Animales', 'animales');
      const created = await request(app.getHttpServer()).post('/api/products').send({ title: 'Original', description: 'Desc', price: 100, images: [], categoryId: cid }).expect(201);

      const res = await request(app.getHttpServer()).patch(`/api/products/${created.body.id}`).send({ title: 'Actualizado', price: 9999 }).expect(200);
      expect(res.body.title).toBe('Actualizado');
      expect(res.body.price).toBe(9999);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer()).patch('/api/products/999').send({ title: 'Nope' }).expect(404);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      const cid = await seedCategory('Animales', 'animales');
      const created = await request(app.getHttpServer()).post('/api/products').send({ title: 'Temporal', description: 'Desc', price: 100, images: [], categoryId: cid }).expect(201);

      await request(app.getHttpServer()).delete(`/api/products/${created.body.id}`).expect(200);

      await request(app.getHttpServer()).get(`/api/products/${created.body.id}`).expect(404);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer()).delete('/api/products/999').expect(404);
    });
  });
});
