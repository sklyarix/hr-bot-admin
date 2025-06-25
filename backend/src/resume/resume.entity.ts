import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {} from 'typeorm/browser';
import { ResumeAnswerEntity } from '../resume_answer/resume_answer.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'resumes' })
export class ResumeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // 📎 Ссылка на портфолио (Notion, Behance, PDF и т.д.)
  @Column({ nullable: true })
  portfolioLink: string;

  // 💰 ЗП
  @Column()
  salary: string;

  // ⛓️ Кто автор резюме
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  // ⛓️ Ответы пользователя на вопросы (массив)
  @OneToMany(() => ResumeAnswerEntity, (answer) => answer.resume, {
    cascade: true,
  })
  answers: ResumeAnswerEntity[];
}
