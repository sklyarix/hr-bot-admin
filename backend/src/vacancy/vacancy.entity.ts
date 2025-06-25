import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'vacancies' })
export class VacancyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // 💼 Описание вакансии
  @Column()
  name: string;

  // 📄 Описание вакансии
  @Column()
  description: string;

  // 📄 Описание тестового задания
  @Column({ nullable: true })
  testTask: string;

  // 🏞️ Изображение
  @Column()
  img: string;
}
