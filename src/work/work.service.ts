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
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class WorkService {
  private ALL;
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
    private readonly entityManager: EntityManager,
  ) {
    this.ALL = 'ALL';
  }

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
      machine,
      totalNG,
      totalOK,
      quantity,
      note,
      listNG,
    } = body;

    console.log(body);

    const work_new = new Work();
    work_new.day = parseInt(day);
    work_new.month = parseInt(month);
    work_new.shift = shift;
    work_new.week = parseInt(week);
    work_new.time = time;
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
      const newWorkModel = this.workModelRepo.create(work_model);
      const workModel = await this.workModelRepo.save(newWorkModel);
      if (listNG?.length > 0) {
        const arrNG = [];
        listNG.map((item) => {
          const newNg = new WorkNG();
          newNg.NG_name = item?.NG_name;
          newNg.total = item?.total;
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
      .select([
        'model.model_id',
        'model.model_code',
        'model.model_name',
        'model.color',
      ])
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

  async getData(body) {
    const { page, rowPerpage, week, day, month, year, model, department } =
      body;
    const take = rowPerpage || 10; // số bản ghi cần lấy
    const skip = page ? parseInt(page) * parseInt(take) : 0; // vị trí
    // const [result, total] = await this.workRepo.findAndCount({
    //   where: { delete_at: null },
    //   order: { created_at: 'DESC' },
    //   take: take,
    //   skip: skip,
    // });;
    // }
    let weekStr = '';
    if (week && week !== 'ALL') {
      weekStr = ` AND work.week = ${week}`;
    }
    let dayStr = '';
    if (day && day !== 'ALL') {
      dayStr = ` AND work.day = ${day}`;
    }
    let monthStr = '';
    if (month && month !== 'ALL') {
      monthStr = ` AND work.month = ${month}`;
    }
    let yearStr = '';
    if (year && year !== 'ALL') {
      yearStr = ` AND work.year = ${year}`;
    }
    let modelStr = '';
    if (model && model !== 'ALL') {
      modelStr = ` where work_model.modelId = ${model}`;
    }
    let departStr = '';
    if (department && department !== 'ALL') {
      departStr = ` and  work.department_id = ${department}`;
    }
    const startQuery = `SELECT work.work_id, work.week, work.day, work.month, work.year, work.shift,work.time, department.department_name, DataSelect.*
    FROM work`;
    const startCountQuery = `SELECT COUNT(*) AS total_count
    FROM work `;
    const subQuery = ` LEFT JOIN department ON department.department_id = work.department_id
    INNER JOIN (
        SELECT work_model.quantity,work_model.qtyNG,work_model.qtyOK,work_model.workId, ModelSelect.*, stage.stage_name
        FROM work_model
        INNER JOIN stage ON stage.stage_id = work_model.stageId
        INNER JOIN (
            SELECT model.model_id, model.model_name, model.model_code, model.color
            FROM model
        ) AS ModelSelect ON ModelSelect.model_id = work_model.modelId${modelStr}
    ) AS DataSelect ON DataSelect.workId = work.work_id
    WHERE work.delete_at IS NULL ${weekStr}${dayStr}${monthStr}${yearStr}${departStr}`;
    const endQuery = ` ORDER BY work.created_at DESC
  OFFSET ${skip} ROWS FETCH NEXT ${take} ROWS ONLY;`;

    const query = startQuery + subQuery + endQuery;
    const countQuery = startCountQuery + subQuery;

    const rsQuery = query.replaceAll('\n', '');
    const rsCoutQuery = countQuery.replaceAll('\n', '');

    // return { rsQuery, rsCoutQuery };

    // const query = `select work.work_id,work.week,work.day,work.month,work.year,work.shift,work.created_at,department.department_name,DataSelect.*
    // from work
    // left join department on department.department_id = work.department_id
    // inner join  (select work_model.*,ModelSelect.*,stage.stage_name from work_model
    // inner join stage on stage.stage_id = work_model.stageId
    // inner join (select model.model_id,model.model_name,model.model_code,color.color_name from model inner join color on color.color_id = model.colorId) as ModelSelect  on ModelSelect.model_id = work_model.modelId) as DataSelect
    // on DataSelect.workId = work.work_id
    // WHERE work.delete_at is NULL
    // ORDER BY work.created_at DESC
    // OFFSET ${page} ROWS FETCH NEXT ${rowPerpage} ROWS ONLY;`;
    // const queryCount = `select COUNT(*) as total from work
    // where delete_at IS NULL;`;
    // return { rsQuery, rsCoutQuery };
    const data = await this.entityManager.query(rsQuery);
    const dataCount = await this.entityManager.query(rsCoutQuery);
    return { data: data, count: dataCount[0]?.total_count ?? 0 };
    // const data = await this.entityManager.query(query);
    // console.log('dataa', data);
    // // const queryCout = `select COUNT(*) as total from work
    // // where delete_at IS NULL`;

    // return data;
  }
  async delete(id, request) {
    const data = await this.workRepo.save({
      work_id: id,
      deleted_by: request?.user?.username ?? '',
      delete_at: new Date(),
    });
    return data;
  }
  async getDetailWork(workId, modelId) {
    const query = `select work.* ,work_model.* from work
    left join work_model on work.work_id = work_model.workId
    where work.work_id = '${workId}'`;
    const dataWork = await this.entityManager.query(query);
    // const workModel = await this.workModelRepo.findOne({
    //   where: { workId: id },
    // });
    // return { dataWork, workModel };
    const work = dataWork[0] ?? {};
    const workNG = await this.workNGRepo.find({ where: { workId, modelId } });
    return { work, workNG };
  }

  async update(body, request) {
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
      machine,
      totalNG,
      totalOK,
      quantity,
      note,
      listNG,
      work_id,
      modelId,
      workModelID,
    } = body;
    const work = await this.workRepo.save({
      work_id: work_id,
      shift,
      day,
      month,
      year,
      week,
      time_id: time,
      department_id: department,
      importer: nameImporter,
      note,
      updated_by: request?.user?.username ?? '',
      update_at: new Date(),
    });
    console.log('body', body);
    console.log('modelCode', modelCode);
    const workModel = await this.workModelRepo.save({
      modelId: modelCode.value,
      id: workModelID,
      workId: work_id,
      stageId: stage.value,
      quantity: quantity,
      qtyOK: totalOK,
      qtyNG: totalNG,
      machine,
    });
    const arrNG = [];
    const data = await this.workNGRepo.delete({
      workId: work_id,
      modelId: modelId,
    });
    listNG.map((item) => {
      const newNg = new WorkNG();
      newNg.NG_name = item?.NG_name;
      newNg.total = item?.total;
      newNg.modelId = modelCode.value;
      newNg.workId = work_id;
      arrNG.push(newNg);
    });
    const workNG = await this.workNGRepo.insert(arrNG);
    return { workModel, work, workNG, data };
  }

  async uploadImageEditor() {
    return 1;
  }
}
