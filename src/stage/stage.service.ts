import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from 'src/entity/stage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private stageRepo: Repository<Stage>,
  ) {}
  async addNew(body, request) {
    const { name } = body;
    const data = new Stage();
    data.stage_name = name;
    data.created_by = request?.user?.username;
    const newData = await this.stageRepo.insert(data);
    return newData?.raw[0] ?? null;
  }

  async updateDepart(body, request) {
    const { name, id } = body;
    const data = await this.stageRepo.save({
      stage_id: id,
      stage_name: name,
      updated_by: request?.user?.username,
    });
    return data;
  }

  async deleteDepart(body, request) {
    if (body?.id) {
      const { id } = body;
      const data = await this.stageRepo.save({
        stage_id: id,
        deleted_by: request?.user?.username ?? '',
        delete_at: new Date(),
      });
      return data;
    }
    return null;
  }
  async getAll() {
    const data = await this.stageRepo.find({});
    return data;
  }
}

//
