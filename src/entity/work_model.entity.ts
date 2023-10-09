/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  modelId: number;
  @Column()
  workId: number;
  @Column()
  stageId: number;
  @Column()
  quantity: number;
  @Column()
  qtyOK: number;
  @Column()
  qtyNG: number;
  @Column()
  machine: string;
  @Column()
  colorID: number;
}
