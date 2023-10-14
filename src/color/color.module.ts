/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from 'src/entity/color.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Color,
    ]),
  ],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
