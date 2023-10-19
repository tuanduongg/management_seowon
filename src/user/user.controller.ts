/* eslint-disable prettier/prettier */
import {
  Controller,
  Res,
  HttpStatus,
  UseGuards,
  Body,
  Req,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() body, @Res() res: Response, @Req() request: Request) {
    const user = await this.userService.createUser(body, request);
    if (user) {
      user.password = '';
      return res.status(HttpStatus.OK).send(user);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot create user' });
  }

  @UseGuards(AuthGuard)
  @Post('/all')
  async getAll(@Body() body, @Res() res: Response) {
    const users = await this.userService.getAll(body);
    return res.status(HttpStatus.OK).send(users);
  }

  @UseGuards(AuthGuard)
  @Post('/update')
  async update(@Body() body, @Res() res: Response, @Req() request: Request) {
    const users = await this.userService.update(body, request);
    return res.status(HttpStatus.OK).send(users);
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(@Body() body, @Res() res: Response, @Req() request: Request) {
    const users = await this.userService.delete(body, request);
    return res.status(HttpStatus.OK).send(users);
  }
  @UseGuards(AuthGuard)
  @Post('/change-password')
  async changePassword(@Body() body, @Res() res: Response, @Req() request: Request) {
    const user = await this.userService.changePassword(body, request);
    if(user) {
      return res.status(HttpStatus.OK).send(user);
    }
    return res.status(HttpStatus.BAD_REQUEST).send({message:'Invalid current password!'});
    
  }
}
