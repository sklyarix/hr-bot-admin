import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeAnswerEntity } from './resume_answer.entity';
import { ResumeAnswersController } from './resume_answers.controller';
import { ResumeAnswersService } from './resume_answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeAnswerEntity])],
  providers: [ResumeAnswersService],
  controllers: [ResumeAnswersController],
  exports: [ResumeAnswersService],
})
export class ResumeAnswersModule {}
