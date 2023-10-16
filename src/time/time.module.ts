/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {   TimeController } from './time.controller';
import {   TimeService } from './time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Time } from 'src/entity/time.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Time,
    ]),
  ],
  controllers: [TimeController],
  providers: [TimeService],
})
export class TimeModule {}
