/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from 'src/entity/work.entity';
import { WorkModel } from 'src/entity/work_model.entity';
import { WorkNG } from 'src/entity/work_ng.entity';
import { Time } from 'src/entity/time.entity';
import { Color } from 'src/entity/color.entity';
import { Department } from 'src/entity/department.entity';
import { Stage } from 'src/entity/stage.entity';
import { Model } from 'src/entity/model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Work,
      WorkModel,
      WorkNG,
      Time,
      Color,
      WorkNG,
      Department,
      Stage,
      Model,
    ]),
  ],
  controllers: [WorkController],
  providers: [WorkService],
  exports: [WorkService],
})
export class WorkModule {}
