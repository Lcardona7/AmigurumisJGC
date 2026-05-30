import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.service.findOne(+id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const category = await this.service.update(+id, dto);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.service.remove(+id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
