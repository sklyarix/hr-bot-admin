import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'user_profiles' })
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // ℹ️ Telegram ID
  @Column({ nullable: true })
  fullName: string;

  // ℹ️ Возраст
  @Column({ nullable: true })
  age: number;

  // ℹ️ Город
  @Column({ nullable: true })
  city: string;

  // 🔗 Пользователь
  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
