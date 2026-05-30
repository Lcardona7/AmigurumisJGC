import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import type { Request } from 'express';
import { CustomOrdersService } from './custom-orders.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';

@Controller('custom-orders')
export class CustomOrdersController {
  constructor(private readonly service: CustomOrdersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('referenceImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req: Request, file: Express.Multer.File, cb: (err: Error | null, name: string) => void) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req: Request, file: Express.Multer.File, cb: (err: Error | null, accept: boolean) => void) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Solo se permiten imágenes'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() dto: CreateCustomOrderDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const referenceImageUrl = file ? `/uploads/${file.filename}` : null;
    return this.service.create(dto, referenceImageUrl);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
