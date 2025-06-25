import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/job_application.dto';
import { JobApplicationStatus } from './enums/job_application_status.enum';
import { JobApplicationEntity } from './job_application.entity';
import { JobApplicationsService } from './job_applications.service';

@Controller('job_applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateJobApplicationDto,
  ): Promise<JobApplicationEntity | null> {
    return this.jobApplicationsService.create(dto);
  }

  @Get()
  async getAll() {
    return this.jobApplicationsService.getAll();
  }

  @Get('detail/:id')
  async getByIdTg(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationsService.getDetailById(id);
  }

  @Get('user/:id')
  async getAllByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationsService.findByUserId(id);
  }

  @Get('users')
  async getAllByUserIds(
    @Query('ids') ids: string, // пример: ?ids=1,2,3
  ) {
    const userIds = ids.split(',').map((id) => parseInt(id.trim(), 10));
    return this.jobApplicationsService.findByUsersIds(userIds);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: { status: JobApplicationStatus },
  ): Promise<JobApplicationEntity | null> {
    return this.jobApplicationsService.updateStatus(id, dto.status);
  }
}
