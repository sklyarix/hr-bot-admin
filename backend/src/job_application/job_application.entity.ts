import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResumeEntity } from '../resume/resume.entity';
import { UserEntity } from '../user/user.entity';
import { VacancyEntity } from '../vacancy/vacancy.entity';
import { JobApplicationStatus } from './enums/job_application_status.enum';

@Entity({ name: 'job_applications' })
export class JobApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // ✏️ Результат тестового задания (если есть)
  @Column({ type: 'text', nullable: true })
  testTaskResult: string;

  // 📦 Статус отклика
  @Column({
    type: 'enum',
    enum: JobApplicationStatus,
    default: JobApplicationStatus.NO_REVIEW,
  })
  status: JobApplicationStatus;

  // 🔗 Кто откликнулся
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  // 🔗 Какое резюме отправили (snapshot на момент отклика)
  @ManyToOne(() => ResumeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;

  // 🔗 На какую вакансию
  @ManyToOne(() => VacancyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vacancyId' })
  vacancy: VacancyEntity;
}
