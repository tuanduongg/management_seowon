import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/entity/color.entity';
import { Department } from 'src/entity/department.entity';
import { Model } from 'src/entity/model.entity';
import { Stage } from 'src/entity/stage.entity';
import { Time } from 'src/entity/time.entity';
import { Work } from 'src/entity/work.entity';
import { WorkModel } from 'src/entity/work_model.entity';
import { WorkNG } from 'src/entity/work_ng.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepo: Repository<Work>,
    @InjectRepository(WorkModel)
    private workModelRepo: Repository<WorkModel>,
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
    @InjectRepository(WorkNG)
    private workNGRepo: Repository<WorkNG>,
  ) {}

  async createWork(body, request) {
    const {
      shift,
      time,
      week,
      day,
      month,
      year,
      department,
      nameImporter,
      modelCode,
      stage,
      color,
      machine,
      totalNG,
      totalOK,
      quantity,
      note,
      listNG,
    } = body;

    console.log('shift', shift);

    const work_new = new Work();
    work_new.day = parseInt(day);
    work_new.month = parseInt(month);
    work_new.shift = shift;
    work_new.week = parseInt(week);
    work_new.time_id = parseInt(time);
    work_new.importer = nameImporter;
    work_new.year = parseInt(year);
    work_new.department_id = parseInt(department);
    work_new.created_by = request?.user?.username;
    work_new.note = note;
    const newWork = this.workRepo.create(work_new);
    const work = await this.workRepo.save(newWork);
    if (work) {
      const work_model = new WorkModel();
      work_model.machine = machine;
      work_model.modelId = modelCode.value;
      work_model.quantity = quantity;
      work_model.qtyOK = totalOK;
      work_model.qtyNG = totalNG;
      work_model.stageId = stage.value;
      work_model.workId = work.work_id;
      work_model.colorID = color.value;
      const newWorkModel = this.workModelRepo.create(work_model);
      const workModel = await this.workModelRepo.save(newWorkModel);
      if (listNG?.length > 0) {
        const arrNG = [];
        listNG.map((item) => {
          const newNg = new WorkNG();
          newNg.NG_name = item?.name;
          newNg.total = item?.totalNG;
          newNg.modelId = modelCode.value;
          newNg.workId = work.work_id;
          arrNG.push(newNg);
        });
        const workNG = await this.workNGRepo.insert(arrNG);
        return { workModel, workNG, work };
      } else {
        return { workModel, work };
      }
    }
  }

  async addNewDataMaster(body, request) {
    const { type, data } = body;
    switch (type) {
      case 'STAGE':
        const stage = new Stage();
        stage.stage_name = data?.stage ?? '';
        stage.created_by = request?.user?.username;
        const newStage = this.stageRepo.create(stage);
        const rs = await this.stageRepo.save(newStage);
        return { origin: rs };
      case 'COLOR':
        const color = new Color();
        color.color_name = data?.color ?? '';
        const newColor = this.colorRepo.create(color);
        const res = await this.colorRepo.save(newColor);
        return { origin: res };
      default:
        return null;
    }
  }

  async getDataMaster() {
    const timesPromise = this.timeRepo
      .createQueryBuilder('time')
      .select(['time.time_id', 'time.time_name'])
      .getMany();
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
      .select(['model.model_id', 'model.model_code', 'model.model_name'])
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
