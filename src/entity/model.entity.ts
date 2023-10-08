/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  model_id: number;
  @Column()
  model_code: string;
  @Column()
  model_name: string;
  @Column()
  colorId: number;

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
