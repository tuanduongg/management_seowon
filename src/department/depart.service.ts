import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entity/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartService {
  constructor(
    @InjectRepository(Department)
    private departRepo: Repository<Department>,
  ) {}
  async addNew(body, request) {
    const { name } = body;
    const data = new Department();
    data.department_name = name;
    data.created_by = request?.user?.username;
    const newData = await this.departRepo.insert(data);
    return newData?.raw[0] ?? null;
  }

  async updateDepart(body, request) {
    const { name, id } = body;

    const data = await this.departRepo.save({
      department_id: id,
      department_name: name,
      updated_by: request?.user?.username,
    });
    return data;
  }

  async deleteDepart(body, request) {
    console.log(request?.user);
    if (body?.id) {
      const { id } = body;
      const data = await this.departRepo.save({
        department_id: id,
        deleted_by: request?.user?.username ?? '',
        delete_at: new Date(),
      });
      return data;
    }
    return null;
  }
  async getAll() {
    const data = await this.departRepo.find({});
    return data;
  }
}

//
