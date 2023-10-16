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
import { DepartService } from './depart.service';

@Controller('department')
export class DepartController {
  constructor(private readonly departService: DepartService) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  async addColor(@Body() body, @Req() request: Request, @Res() res: Response) {
    const data = await this.departService.addNew(body, request);
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
    const data = await this.departService.getAll();
    return res.status(HttpStatus.OK).send(data);
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() body, @Req() request: Request, @Res() res: Response) {
    const data = await this.departService.deleteDepart(body, request);
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
    const data = await this.departService.updateDepart(body, request);
    if (data) {
      return res.status(HttpStatus.OK).send(data);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot update!' });
  }
}
