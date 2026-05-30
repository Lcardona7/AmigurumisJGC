import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  create(dto: CreateCategoryDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.repo.findOneBy({ id });
    if (!category) return null;
    Object.assign(category, dto);
    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.repo.findOneBy({ id });
    if (!category) return null;
    return this.repo.remove(category);
  }
}
