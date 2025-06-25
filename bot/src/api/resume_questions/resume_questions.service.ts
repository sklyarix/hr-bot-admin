import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { IResumeQuestion } from '../../shared/resume_question/resume_question.interface';
import { instanceBackend } from '../helpers';

@Injectable()
export class ResumeQuestionsService {
  private readonly url: string;
  constructor() {
    this.url = `/resume_questions`;
  }

  async getAll() {
    const response: AxiosResponse<IResumeQuestion[]> =
      await instanceBackend.get(this.url);

    return response.data;
  }
}
