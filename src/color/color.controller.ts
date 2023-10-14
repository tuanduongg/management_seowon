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
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get('/colors')
  async getColors() {
    const data = await this.colorService.getAll();
    return data;
  }
}
