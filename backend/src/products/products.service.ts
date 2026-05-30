import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    return this.repo.save(this.repo.create(dto as any));
  }

  findAll(categoryId?: number) {
    const where: any = { isAvailable: true };
    if (categoryId) where.categoryId = categoryId;
    return this.repo.find({ where, relations: ['category'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.repo.findOneBy({ id });
    if (!product) return null;
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.repo.findOneBy({ id });
    if (!product) return null;
    return this.repo.remove(product);
  }
}
