import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.service.findAll(categoryId ? +categoryId : undefined);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.service.findOne(+id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const product = await this.service.update(+id, dto);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.service.remove(+id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
