/* eslint-disable prettier/prettier */
import { Controller, Get,UseGuards, Res, HttpStatus,Req } from '@nestjs/common';
import { WorkService } from './work.service';
import { Response ,Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @UseGuards(AuthGuard)
  @Get('/create')
  async getAllWork(@Res() res: Response,@Req() request: Request) {
    console.log('request',request?.user);
    const data = await this.workService.createWork(request);
    if (data) {
      return res.status(HttpStatus.CREATED).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot create user' });
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  async getAll(@Res() res: Response) {
    const users = await this.workService.getDataMaster();
    return res.status(HttpStatus.OK).send(users);
  }
}
