import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/job_application.dto';
import { JobApplicationStatus } from './enums/job_application_status.enum';
import { JobApplicationEntity } from './job_application.entity';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplicationEntity)
    private readonly jobApplicationRepository: Repository<JobApplicationEntity>,
  ) {}

  async create(
    dto: CreateJobApplicationDto,
  ): Promise<JobApplicationEntity | null> {
    const jobApplication = this.jobApplicationRepository.create({
      testTaskResult: dto.testTaskResult,
      status: dto.status ?? JobApplicationStatus.NO_REVIEW,

      user: { id: dto.userId },
      resume: { id: dto.resumeId },
      vacancy: { id: dto.vacancyId },
    });

    const saved = await this.jobApplicationRepository.save(jobApplication);

    return await this.jobApplicationRepository.findOne({
      where: { id: saved.id },
      relations: ['user', 'user.profile', 'resume', 'vacancy'],
    });
  }

  async getDetailById(id: number): Promise<JobApplicationEntity | null> {
    return await this.jobApplicationRepository.findOne({
      where: { id },
      relations: [
        'user',
        'user.profile',
        'resume',
        'resume.answers',
        'resume.answers.question',
        'vacancy',
      ],
    });
  }

  async getAll(): Promise<JobApplicationEntity[]> {
    return await this.jobApplicationRepository.find({
      relations: ['user', 'user.profile', 'resume', 'vacancy'],
    });
  }

  async updateStatus(
    id: number,
    status: JobApplicationStatus,
  ): Promise<JobApplicationEntity | null> {
    await this.jobApplicationRepository.update(id, { status });
    return await this.getDetailById(id);
  }

  async findByUserId(userId: number): Promise<JobApplicationEntity[]> {
    return await this.jobApplicationRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findByUsersIds(userIds: number[]): Promise<JobApplicationEntity[]> {
    return this.jobApplicationRepository.find({
      where: {
        user: { id: In(userIds) },
      },
      relations: ['user', 'user.profile', 'vacancy'],
    });
  }
}
