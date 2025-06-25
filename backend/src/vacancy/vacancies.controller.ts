// TODO прописать TS полностью

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { VacanciesService } from './vacancies.service';
import type { VacancyEntity } from './vacancy.entity';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  async create(@Body() vacancy: CreateVacancyDto) {
    return this.vacanciesService.createVacancy(vacancy);
  }

  @Get()
  async getAll(): Promise<VacancyEntity[]> {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  async getId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VacancyEntity | null> {
    return this.vacanciesService.findId(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.delete(id);
  }
}
// TODO!: add update
