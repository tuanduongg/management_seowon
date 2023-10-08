/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  color_id: number;

  @Column()
  color_name: string;
}
