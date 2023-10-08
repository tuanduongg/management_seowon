import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entity/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create() {
    const depart = new Department();
    depart.department_name = 'ASSY';
    const newDepart = this.departmentRepository.create(depart);
    return await this.departmentRepository.save(newDepart);
  }
  async getAll() {
    const users = await this.departmentRepository.find();
    return users;
  }
}
