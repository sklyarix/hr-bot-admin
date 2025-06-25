import { Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { IResumeQuestion } from '../../shared/resume_question/resume_question.interface';
import { IVacancy } from '../../shared/vacancy/vacancy.interface';
import { instanceBackend } from '../helpers';

@Injectable()
export class VacanciesService {
  private readonly url: string;
  constructor() {
    this.url = `/vacancies`;
  }

  async getAll(): Promise<IVacancy[]> {
    const response: AxiosResponse<IVacancy[]> = await instanceBackend.get(
      this.url,
    );
    return response.data;
  }

  async getId(idVacancy: number): Promise<IVacancy> {
    const response: AxiosResponse<IVacancy> = await instanceBackend.get(
      `${this.url}/${idVacancy}`,
    );
    if (!response.data) {
      throw new Error('Vacancy not found');
    }
    return response.data;
  }

  async getAllQuestion(): Promise<IResumeQuestion[]> {
    const response: AxiosResponse<IResumeQuestion[]> =
      await instanceBackend.get(`/resume_questions`);
    return response.data;
  }
}
