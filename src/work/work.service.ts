import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/entity/color.entity';
import { Department } from 'src/entity/department.entity';
import { Model } from 'src/entity/model.entity';
import { Stage } from 'src/entity/stage.entity';
import { Time } from 'src/entity/time.entity';
import { Work } from 'src/entity/work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepo: Repository<Work>,
    @InjectRepository(Time)
    private timeRepo: Repository<Time>,
    @InjectRepository(Department)
    private departRepo: Repository<Department>,
    @InjectRepository(Color)
    private colorRepo: Repository<Color>,
    @InjectRepository(Stage)
    private stageRepo: Repository<Stage>,
    @InjectRepository(Model)
    private modelRepo: Repository<Model>,
  ) {}

  async createWork(request) {
    const work = new Work();
    work.day = 10;
    work.month = 9;
    work.shift = 'DAY';
    work.week = 30;
    work.year = 2023;
    work.importer = 'toilatuan';
    work.time_id = 1;
    work.department_id = request?.user?.department_id;
    const newObj = this.workRepo.create(work);
    return await this.workRepo.save(newObj);
  }

  async getDataMaster() {
    const timesPromise = this.timeRepo.find();
    const departmentsPromise = this.departRepo
      .createQueryBuilder('department')
      .select(['department.department_id', 'department.department_name'])
      .where('department.delete_at IS NULL')
      .getMany();
    const colorsPromise = this.colorRepo.find();
    const stagesPromise = this.stageRepo
      .createQueryBuilder('stage')
      .select(['stage.stage_id', 'stage.stage_name'])
      .where('stage.delete_at IS NULL')
      .getMany();
    const modelsPromise = this.modelRepo
      .createQueryBuilder('model')
      .select(['model.model_id', 'model.model_name', 'model.colorId'])
      .where('model.delete_at IS NULL')
      .getMany();

    const [times, departments, colors, stages, models] = await Promise.all([
      timesPromise,
      departmentsPromise,
      colorsPromise,
      stagesPromise,
      modelsPromise,
    ]);

    return {
      times,
      departments,
      colors,
      stages,
      models,
    };
  }
}
