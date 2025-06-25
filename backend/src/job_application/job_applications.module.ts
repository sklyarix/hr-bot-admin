import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationEntity } from './job_application.entity';
import { JobApplicationsController } from './job_applications.controller';
import { JobApplicationsService } from './job_applications.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplicationEntity])],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
  exports: [JobApplicationsService],
})
export class JobApplicationsModule {}
