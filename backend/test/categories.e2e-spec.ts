import request from 'supertest';
import { createApp, closeApp, cleanDatabase } from './setup';
import { INestApplication } from '@nestjs/common';

describe('Categories (e2e)', () => {
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

  describe('POST /api/categories', () => {
    it('should create a category', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/categories')
        .send({ name: 'Animales', slug: 'animales' })
        .expect(201);

      expect(res.body).toMatchObject({ name: 'Animales', slug: 'animales' });
      expect(res.body.id).toBeDefined();
    });

    it('should reject duplicate name', async () => {
      await request(app.getHttpServer())
        .post('/api/categories')
        .send({ name: 'Animales', slug: 'animales' })
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/categories')
        .send({ name: 'Animales', slug: 'animales-2' })
        .expect(500);
    });

    it('should reject invalid data', async () => {
      await request(app.getHttpServer())
        .post('/api/categories')
        .send({})
        .expect(400);
    });
  });

  describe('GET /api/categories', () => {
    it('should return empty list', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/categories')
        .expect(200);
      expect(res.body).toEqual([]);
    });

    it('should return all categories', async () => {
      await request(app.getHttpServer()).post('/api/categories').send({ name: 'Animales', slug: 'animales' }).expect(201);
      await request(app.getHttpServer()).post('/api/categories').send({ name: 'Personajes', slug: 'personajes' }).expect(201);

      const res = await request(app.getHttpServer()).get('/api/categories').expect(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /api/categories/:id', () => {
    it('should return a category by id', async () => {
      const created = await request(app.getHttpServer()).post('/api/categories').send({ name: 'Llaveros', slug: 'llaveros' }).expect(201);

      const res = await request(app.getHttpServer()).get(`/api/categories/${created.body.id}`).expect(200);
      expect(res.body.name).toBe('Llaveros');
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer()).get('/api/categories/999').expect(404);
    });
  });

  describe('PATCH /api/categories/:id', () => {
    it('should update a category', async () => {
      const created = await request(app.getHttpServer()).post('/api/categories').send({ name: 'Animales', slug: 'animales' }).expect(201);

      const res = await request(app.getHttpServer()).patch(`/api/categories/${created.body.id}`).send({ name: 'Actualizado' }).expect(200);
      expect(res.body.name).toBe('Actualizado');
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer()).patch('/api/categories/999').send({ name: 'Nope' }).expect(404);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category', async () => {
      const created = await request(app.getHttpServer()).post('/api/categories').send({ name: 'Temporal', slug: 'temporal' }).expect(201);

      await request(app.getHttpServer()).delete(`/api/categories/${created.body.id}`).expect(200);

      await request(app.getHttpServer()).get(`/api/categories/${created.body.id}`).expect(404);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app.getHttpServer()).delete('/api/categories/999').expect(404);
    });
  });
});
