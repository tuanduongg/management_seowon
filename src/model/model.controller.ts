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
import { Response, Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ModelService } from './model.service';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('/add')
  async addColor(@Body() body, @Req() request: Request) {
    const data = await this.modelService.add(body, request);
    return data;
  }

  @Post('/getAll')
  async getAll(@Body() body) {
    const data = await this.modelService.getAll(body);
    return data;
  }
}
