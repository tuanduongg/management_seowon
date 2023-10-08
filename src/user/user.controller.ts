/* eslint-disable prettier/prettier */
import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async getHello(@Res() res: Response) {
    const user = await this.userService.createUser();
    if (user) {
      user.password = '';
      return res.status(HttpStatus.CREATED).send(user);
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: 'Cannot create user' });
  }
  @Get('/all')
  async getAll(@Res() res: Response) {
    const users = await this.userService.getAll();
    return res.status(HttpStatus.OK).send(users);
  }
}
