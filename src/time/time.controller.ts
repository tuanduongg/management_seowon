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
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  async addColor(@Body() body, @Req() request: Request, @Res() res: Response) {
    const data = await this.timeService.add(body);
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
    const data = await this.timeService.getAll();
    return res.status(HttpStatus.OK).send(data);
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() body, @Res() res: Response) {
    const data = await this.timeService.delete(body);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot delete!' });
  }

  @UseGuards(AuthGuard)
  @Post('/update')
  async update(@Body() body, @Res() res: Response) {
    const data = await this.timeService.update(body);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot update!' });
  }
}
