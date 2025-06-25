import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'resume_questions' })
export class ResumeQuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;

  // ℹ️ Вопрос
  @Column({ type: 'text' })
  text: string;

  // 🔠 Минимальная длина ответа
  @Column({ type: 'int' })
  minLength: number;

  // 🔤 Регулярное выражение для валидации
  @Column({ type: 'text' })
  validationRegex: string;

  // ❗ Сообщение об ошибке
  @Column({ type: 'text' })
  errorMessage: string;
}
