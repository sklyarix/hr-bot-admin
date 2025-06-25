import { Module } from '@nestjs/common';
import { ApiModule } from '../../api/api.module';
import { ChatGptService } from './chatGpt.service';
import { JobApplicationMessageService } from './JobApplicationMessageService.service';
import { NotificationService } from './notification.service';

@Module({
  imports: [ApiModule],
  providers: [
    NotificationService,
    JobApplicationMessageService,
    ChatGptService,
  ],
  exports: [NotificationService, JobApplicationMessageService, ChatGptService], // 👈 экспортируем
})
export class ServicesModule {}
