import { Controller, UseGuards, Get, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post, HttpStatus } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() body, @Res() res: Response) {
    console.log('body', body);
    const result = await this.authService.signIn(body.username, body.password);
    console.log('result', result);

    if (result) {
      return res.status(HttpStatus.OK).send(result);
    }
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: 'Login fail', status: HttpStatus.UNAUTHORIZED });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
