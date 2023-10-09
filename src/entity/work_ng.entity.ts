/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkNG {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  modelId: number;
  @Column()
  workId: number;
  @Column()
  NG_name: string;
  @Column()
  total: number;
  @Column({nullable: true})
  status: string;
}
