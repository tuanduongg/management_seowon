/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entity/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService]
})
export class DepartmentModule {}
