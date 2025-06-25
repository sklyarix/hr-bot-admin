import { Module } from '@nestjs/common';
import { ApiModule } from '../../api/api.module';
import { ServicesModule } from '../services/services.module';
import { JobApplicationsAction } from './jobApplications.action';

@Module({
  imports: [ApiModule, ServicesModule],
  providers: [JobApplicationsAction],
})
export class JobApplicationsModule {}
