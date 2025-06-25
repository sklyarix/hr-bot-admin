import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ResumeEntity } from '../resume/resume.entity';
import { ResumeQuestionEntity } from '../resume_question/resume_question.entity';

@Entity({ name: 'resume_answers' })
export class ResumeAnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;

  // ℹ️ Ответ пользователя
  @Column({ type: 'text' })
  answer: string;

  // ⛓️ Резюме
  @ManyToOne(() => ResumeEntity, (resume) => resume.answers, {
    onDelete: 'CASCADE',
  })
  resume: ResumeEntity;

  // ⛓️ Вопрос (может быть null, если удалён)
  @ManyToOne(() => ResumeQuestionEntity, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  question: ResumeQuestionEntity | null;
}
