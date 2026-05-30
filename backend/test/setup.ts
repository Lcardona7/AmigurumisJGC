import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../src/categories/categories.module';
import { ProductsModule } from '../src/products/products.module';
import { CustomOrdersModule } from '../src/custom-orders/custom-orders.module';
import { Category } from '../src/categories/category.entity';
import { Product } from '../src/products/product.entity';
import { CustomOrder } from '../src/custom-orders/custom-order.entity';
import { DataSource } from 'typeorm';

let app: INestApplication;
let dataSource: DataSource;

export async function createApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [Category, Product, CustomOrder],
        synchronize: true,
      }),
      CategoriesModule,
      ProductsModule,
      CustomOrdersModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.init();

  dataSource = app.get(DataSource);
  return app;
}

export async function cleanDatabase() {
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repo = dataSource.getRepository(entity.name);
    await repo.clear();
  }
}

export async function closeApp() {
  if (app) await app.close();
}
