import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Time } from 'src/entity/time.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time)
    private timeRepo: Repository<Time>,
  ) {}
  async add(body) {
    try {
      const { from, name, to } = body;
      const time = new Time();
      time.time_name = name;
      time.time_from = from;
      time.time_to = to;
      const data = await this.timeRepo.insert(time);
      return data?.raw[0] ?? null;
    } catch (error) {
      return null;
    }
  }

  async update(body) {
    const { from, name, to, id } = body;

    const data = await this.timeRepo.save({
      time_id: id,
      time_name: name,
      time_from: from,
      time_to: to,
    });
    return data;
  }

  async delete(body) {
    if (body?.id) {
      const { id } = body;
      const data = await this.timeRepo.delete({ time_id: id });
      return data;
    }
    return null;
  }
  async getAll() {
    const times = await this.timeRepo.find({});
    return times;
  }
}

//
