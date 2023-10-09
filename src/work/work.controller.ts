/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Req,
  Body,
  Post,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async getAllWork(@Res() res: Response, @Body() body, @Req() request: Request) {
    // const data = await this.workService.createWork(request);
    const data = body?.data;
    const dataObj = JSON.parse(data);
    console.log('dataObj',dataObj);
    if (data) {
      const result = await this.workService.createWork(dataObj,request);
      return res.status(HttpStatus.CREATED).send(result);
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
  @UseGuards(AuthGuard)
  @Post('/addNewData')
  async addNewData(@Req() request: Request,@Res() res: Response, @Body() body) {
    const data = await this.workService.addNewDataMaster(body,request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'cannot add new' });
  }
  @UseGuards(AuthGuard)
  @Post('/add')
  async create(@Req() request: Request,@Res() res: Response, @Body() body) {
    const data = await this.workService.addNewDataMaster(body,request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'cannot add new' });
  }
}
