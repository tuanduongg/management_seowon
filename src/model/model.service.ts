import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/entity/model.entity';
import { Repository } from 'typeorm';
import { ILike, FindOptionsUtils } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelRepo: Repository<Model>,
  ) {}
  async add(body, request) {
    const { code, name, color } = body;
    const model = new Model();
    model.model_code = code;
    model.model_name = name;
    model.color = color;
    model.created_by = request?.user?.username;
    const data = await this.modelRepo.insert(model);
    return data?.raw[0] ?? null;
  }

  async getAll(body) {
    const page = body.page || 0; // Current page number
    const limit = body.rowPerpage || 10;
    const search = body.search;
    const skip = page * limit;
    const skipValue = skip >= 0 ? skip : 0;

    const [models, total] = await this.modelRepo.findAndCount({
      // where: FindOptionsUtils.and(
      //   { column3: ILike('%searchTerm3%') },
      //   { column3: ILike('%searchTerm3%') },
      //   FindOptionsUtils.or(
      //     { column1: ILike('%searchTerm1%') },
      //     { column2: ILike('%searchTerm2%') },
      //   ),
      // ),
      where: { delete_at: null, model_name: ILike(`%${search}%`) },
      skip: skipValue,
      take: limit, // Set the number of items to retrieve
    });
    return { models, total };
  }
}
