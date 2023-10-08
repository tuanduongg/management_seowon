/* eslint-disable prettier/prettier */
import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Response } from 'express';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('/create')
  async createDepart(@Res() res: Response) {
    const depart = await this.departmentService.create();
    if (depart) {
      return res.status(HttpStatus.CREATED).send(depart);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot create department' });
  }
  @Get('/all')
  async getAll(@Res() res: Response) {
    const data = await this.departmentService.getAll();
    return res.status(HttpStatus.OK).send(data);
  }
}
