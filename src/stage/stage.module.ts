/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StageController } from './stage.controller';
import { StageService } from './stage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from 'src/entity/stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
