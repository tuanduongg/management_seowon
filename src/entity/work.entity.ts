/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  work_id: number;
  @Column({ nullable: true })
  shift: string;
  @Column({ nullable: true })
  day: number;
  @Column({ nullable: true })
  month: number;
  @Column({ nullable: true })
  year: number;
  @Column({ nullable: true })
  week: number;
  @Column({ nullable: true })
  time_id: number;
  @Column({ nullable: true })
  department_id: number;
  @Column({ nullable: true })
  importer: string;
  @Column({ nullable: true })
  note: string;

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
