/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartController } from './depart.controller';
import { DepartService } from './depart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entity/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartController],
  providers: [DepartService],
})
export class DepartModule {}
