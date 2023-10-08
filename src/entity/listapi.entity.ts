/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity()
  export class ListAPI {
    @PrimaryGeneratedColumn()
    api_id: number;
  
    @Column()
    api_name: string;
  
    @Column()
    screen: string;
  
    @Column()
    type: string;
  }
  