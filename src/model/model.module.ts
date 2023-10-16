/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'src/entity/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
