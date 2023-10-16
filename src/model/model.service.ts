import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/entity/model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelRepo: Repository<Model>,
  ) {}
  async add(body, request) {
    try {
      const { code, name, color } = body;
      const model = new Model();
      model.model_code = code;
      model.model_name = name;
      model.color = color;
      model.created_by = request?.user?.username;
      const data = await this.modelRepo.insert(model);
      return data?.raw[0] ?? null;
    } catch (error) {
      return null;
    }
  }

  async update(body, request) {
    const { code, name, color, id } = body;
    const data = await this.modelRepo.save({
      model_id: id,
      color: color,
      model_name: name,
      model_code: code,
      updated_by: request?.user?.username,
    });
    return data;
  }

  async delete(body, request) {
    if (body?.id) {
      const { id } = body;
      const data = await this.modelRepo.save({
        model_id: id,
        deleted_by: request?.user?.username ?? '',
        delete_at: new Date(),
      });
      return data;
    }
    return null;
  }
  async getAll(body) {
    const page = body.page || 0; // Current page number
    const limit = body.rowPerpage || 10;
    const search = body.search;
    const skip = page * limit;
    const skipValue = skip >= 0 ? skip : 0;

    const [models, total] = await this.modelRepo
      .createQueryBuilder('model')
      .where('model.delete_at IS NULL')
      .andWhere(
        '(model.model_code LIKE :keyword OR model.model_name LIKE :keyword)',
        { keyword: `%${search}%` },
      )
      .skip(skipValue)
      .take(limit)
      .orderBy('created_at', 'DESC')
      .getManyAndCount();
    return { models, total };
  }
}

//
