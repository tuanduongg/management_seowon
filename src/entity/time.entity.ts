/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity()
  export class Time {
    @PrimaryGeneratedColumn()
    time_id: number;
  
    @Column()
    time_name: string;
  
    @Column()
    time_from: string;

    @Column()
    time_to: string;
  }
  