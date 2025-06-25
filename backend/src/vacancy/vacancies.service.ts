import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { VacancyEntity } from './vacancy.entity';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepository: Repository<VacancyEntity>,
  ) {}
  async findAll(): Promise<VacancyEntity[]> {
    return await this.vacancyRepository.find();
  }

  async findId(id: number): Promise<VacancyEntity | null> {
    return await this.vacancyRepository.findOne({
      where: { id },
    });
  }

  async createVacancy(dto: CreateVacancyDto): Promise<VacancyEntity> {
    const vacancy = this.vacancyRepository.create(dto);
    return await this.vacancyRepository.save(vacancy);
  }

  async delete(id: number): Promise<VacancyEntity | null> {
    const vacancy = await this.findId(id);
    if (!vacancy) {
      throw new ConflictException('The vacancy does not exist');
    }
    return await this.vacancyRepository.remove(vacancy);
  }
}
