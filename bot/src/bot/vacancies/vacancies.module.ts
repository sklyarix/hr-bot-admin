import { Module } from '@nestjs/common';
import { ApiModule } from '../../api/api.module';
import { ServicesModule } from '../services/services.module';
import { SceneJobApplication } from './scenes/job_application.scene';
import { VacanciesAction } from './vacancies.action';
import { VacanciesHears } from './vacancies.hears';
import { VacanciesUiService } from './vacancies.ui.service';

@Module({
  imports: [ApiModule, ServicesModule],
  providers: [
    VacanciesHears,
    VacanciesAction,
    VacanciesUiService,
    SceneJobApplication,
  ],
  exports: [VacanciesUiService],
})
export class VacanciesModule {}
