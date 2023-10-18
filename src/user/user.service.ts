import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import {
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  EntityManager,
} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(body, request): Promise<User> {
    const { username, password, role, department } = body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    user.department_id = department;
    user.created_by = request?.user?.username;
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
  async getAll(body) {
    const page = body.page || 0;
    const limit = body.rowPerpage || 10;
    const search = body.search;
    const skip = page * limit;
    const skipValue = skip >= 0 ? skip : 0;

    // const [users, total] = await this.userRepository
    //   .createQueryBuilder('user')
    //   .innerJoinAndSelect('user.department', 'department')
    //   .select(['user', 'department'])
    //   .where('user.deleted_at IS NULL')
    //   .andWhere('user.username LIKE :keyword', { keyword: `%${search}%` })
    //   .skip(skipValue)
    //   .take(limit)
    //   .orderBy('user.created_at', 'DESC')
    //   .getManyAndCount();
    const endgetData = `order by created_at desc
    OFFSET ${skipValue} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
    const where = `where UserSeowon.delete_at is null and UserSeowon.username like '%${search}%'`;
    const startCount = `select COUNT(*) AS total_count from [user] as UserSeowon ${where}`;
    const startgetData = `select UserSeowon.*,department.department_name from [user] as UserSeowon
    inner join department on department.department_id = UserSeowon.department_id ${where} ${endgetData}`;
    const data = await this.entityManager.query(startgetData);
    const dataCount = await this.entityManager.query(startCount);
    return { data, count: dataCount[0]?.total_count };
    // return { users, total };
  }
  async update(body, request) {
    const { id, username, role, department } = body;
    return await this.userRepository.save({
      user_id: id,
      username,
      role,
      department_id: department,
      updated_by: request?.user?.username,
    });
  }
  async delete(body, request) {
    const { id } = body;
    return await this.userRepository.save({
      user_id: id,
      deleted_by: request?.user?.username,
      delete_at: new Date(),
    });
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
