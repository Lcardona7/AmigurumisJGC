import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomOrder } from './custom-order.entity';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';

@Injectable()
export class CustomOrdersService {
  constructor(
    @InjectRepository(CustomOrder)
    private readonly repo: Repository<CustomOrder>,
  ) {}

  create(dto: CreateCustomOrderDto, referenceImageUrl: string | null) {
    return this.repo.save(
      this.repo.create({ ...dto, referenceImageUrl }),
    );
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
