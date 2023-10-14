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
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepo: Repository<Color>,
  ) {}

  async getAll() {
    const colors = await this.colorRepo.find();
    return colors;
  }
}
