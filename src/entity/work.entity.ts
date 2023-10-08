/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  work_id: number;
  @Column()
  shift: string;
  @Column()
  day: number;
  @Column()
  month: number;
  @Column()
  year: number;
  @Column()
  week: number;
  @Column()
  time_id: number;
  @Column()
  department_id: number;
  @Column()
  importer: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  delete_at: Date;

  @Column({ nullable: true })
  created_by: string;
  @Column({ nullable: true })
  updated_by: string;
  @Column({ nullable: true })
  deleted_by: string;
}
