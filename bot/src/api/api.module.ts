import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JobApplicationsService } from './job_applications/job_applications.service';
import { ReferralCodesService } from './referral_codes/referral_codes.service';
import { ReferralsService } from './referrals/referrals.service';
import { ResumeQuestionsService } from './resume_questions/resume_questions.service';
import { ResumesService } from './resumes/resumes.service';
import { UserProfilesService } from './user_profiles/user_profiles.service';
import { UsersService } from './users/users.service';
import { VacanciesService } from './vacancies/vacancies.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    UsersService,
    UserProfilesService,
    ReferralsService,
    ReferralCodesService,
    VacanciesService,
    JobApplicationsService,
    ResumesService,
    ResumeQuestionsService,
  ],
  exports: [
    UsersService,
    UserProfilesService,
    ReferralsService,
    ReferralCodesService,
    VacanciesService,
    JobApplicationsService,
    ResumesService,
    ResumeQuestionsService,
  ],
})
export class ApiModule {}
