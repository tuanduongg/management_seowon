import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(): Promise<User> {
    const user = new User();
    user.username = 'admin2';
    user.password = 'admin2';
    user.role = 'ADMIN';
    user.department_id = 1;
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findByUsername(username: string) {
    const findOptions: FindOneOptions<User> = {
      where: {
        username: username,
      } as FindOptionsWhere<User>,
    };
    const user = await this.userRepository.findOne(findOptions);
    return user;
  }
}
