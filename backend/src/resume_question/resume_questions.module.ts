import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeQuestionEntity } from './resume_question.entity';
import { ResumeQuestionsController } from './resume_questions.controller';
import { ResumeQuestionsService } from './resume_questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeQuestionEntity])],
  controllers: [ResumeQuestionsController],
  providers: [ResumeQuestionsService],
  exports: [ResumeQuestionsService],
})
export class ResumeQuestionsModule {}
