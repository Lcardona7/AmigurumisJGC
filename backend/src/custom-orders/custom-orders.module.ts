import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CustomOrdersController } from './custom-orders.controller';
import { CustomOrdersService } from './custom-orders.service';
import { CustomOrder } from './custom-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomOrder]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [CustomOrdersController],
  providers: [CustomOrdersService],
})
export class CustomOrdersModule {}
