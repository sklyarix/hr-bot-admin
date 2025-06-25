import { Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { VacancyEntity } from './vacancy.entity';
export declare class VacanciesService {
    private readonly vacancyRepository;
    constructor(vacancyRepository: Repository<VacancyEntity>);
    findAll(): Promise<VacancyEntity[]>;
    findId(id: number): Promise<VacancyEntity | null>;
    createVacancy(dto: CreateVacancyDto): Promise<VacancyEntity>;
    delete(id: number): Promise<VacancyEntity | null>;
}
