/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Permisstion {
  @PrimaryGeneratedColumn()
  permisstion_id: number;

  @Column()
  screen: string;

  @Column()
  role: string;

  @Column()
  isCreate: boolean;
  @Column()
  isUpdate: boolean;
  @Column()
  isDelete: boolean;
  @Column()
  isImport: boolean;
  @Column()
  isExport: boolean;
}
