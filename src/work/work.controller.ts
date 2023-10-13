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
  async getAllWork(
    @Res() res: Response,
    @Body() body,
    @Req() request: Request,
  ) {
    // const data = await this.workService.createWork(request);
    const data = body?.data;
    const dataObj = JSON.parse(data);
    if (data) {
      const result = await this.workService.createWork(dataObj, request);
      return res.status(HttpStatus.CREATED).send(result);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot create user' });
  }

  @UseGuards(AuthGuard)
  @Get('/master')
  async getAll(@Res() res: Response) {
    const users = await this.workService.getDataMaster();
    return res.status(HttpStatus.OK).send(users);
  }
  @UseGuards(AuthGuard)
  @Post('/addNewData')
  async addNewData(
    @Req() request: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    const data = await this.workService.addNewDataMaster(body, request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'cannot add new' });
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  async create(@Req() request: Request, @Res() res: Response, @Body() body) {
    const data = await this.workService.addNewDataMaster(body, request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'cannot add new' });
  }

  // @UseGuards(AuthGuard)
  @Post('/getData')
  async getData(@Req() request: Request, @Res() res: Response, @Body() body) {
    console.log('body', body);
    const data = await this.workService.getData(body);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'get data fail' });
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async deleteWork(
    @Req() request: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    const { id } = body;
    if (id) {
      const data = await this.workService.delete(id, request);
      if (data) {
        return res.status(HttpStatus.OK).send(data);
      }
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot delete!' });
  }


  @UseGuards(AuthGuard)
  @Post('/getDetailWork')
  async getDetail(
    @Req() request: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    const { workId,modelId } = body;
    if (workId && modelId) {
      const data = await this.workService.getDetailWork(workId,modelId);
      if (data) {
        return res.status(HttpStatus.OK).send(data);
      }
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot delete!' });
  }


  @UseGuards(AuthGuard)
  @Post('/update')
  async update(
    @Req() request: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    const data = body?.data;
    const dataObj = JSON.parse(data);
    const { work_id,modelId } = dataObj;
    if (work_id && modelId) {
      const data = await this.workService.update(dataObj,request);
      if (data) {
        return res.status(HttpStatus.CREATED).send(data);
      }
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot update!' });
  }

  @UseGuards(AuthGuard)
  @Post('/uploadImageEditor')
  async uploadImageEditor(
    @Req() request: Request,
    @Res() res: Response,
    @Body() body,
  ) {
    const data = body?.data;
    const dataObj = JSON.parse(data);
    const { work_id,modelId } = dataObj;
    if (work_id && modelId) {
      const data = await this.workService.update(dataObj,request);
      if (data) {
        return res.status(HttpStatus.CREATED).send(data);
      }
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot update!' });
  }
}
