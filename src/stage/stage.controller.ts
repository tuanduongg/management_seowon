/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Res,
  HttpStatus,
  Req,
  Body,
  Post,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { StageService } from './stage.service';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  async addColor(@Body() body, @Req() request: Request, @Res() res: Response) {
    const data = await this.stageService.addNew(body, request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot add new!' });
  }

  @UseGuards(AuthGuard)
  @Post('/getAll')
  async getAll(@Body() body, @Res() res: Response) {
    const data = await this.stageService.getAll(body);
    return res.status(HttpStatus.OK).send(data);
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() body, @Req() request: Request, @Res() res: Response) {
    const data = await this.stageService.deleteDepart(body, request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot delete!' });
  }

  @UseGuards(AuthGuard)
  @Post('/update')
  async update(@Body() body, @Req() request: Request, @Res() res: Response) {
    const data = await this.stageService.updateDepart(body, request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot update!' });
  }
}
