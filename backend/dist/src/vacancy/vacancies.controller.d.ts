import { CreateVacancyDto } from './dto/vacancy.dto';
import { VacanciesService } from './vacancies.service';
import type { VacancyEntity } from './vacancy.entity';
export declare class VacanciesController {
    private readonly vacanciesService;
    constructor(vacanciesService: VacanciesService);
    create(vacancy: CreateVacancyDto): Promise<VacancyEntity>;
    getAll(): Promise<VacancyEntity[]>;
    getId(id: number): Promise<VacancyEntity | null>;
    delete(id: number): Promise<VacancyEntity | null>;
}
