import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = {
        username: user.username,
        id: user.user_id,
        role: user.role,
        department_id: user.department_id,
      };
      return {
        user: payload,
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }
  // async checkLogin(username: string, pass: string): Promise<any> {
  //   const user = await this.userService.findByUsername(username);
  //   if (user && (await bcrypt.compare(pass, user.password))) {
  //     const payload = {
  //       username: user.username,
  //       id: user.user_id,
  //       role: user.role,
  //       department_id: user.department_id,
  //     };
  //     return {
  //       user: payload,
  //       accessToken: await this.jwtService.signAsync(payload),
  //     };
  //   }
  //   return null;
  // }
}
