import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfileEntity } from '../user_profile/user_profile.entity';
import { UserRole } from './enums/user-role.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // ℹ️ Telegram ID
  @Column({ type: 'bigint' })
  idTg: string;

  // 🧑‍🧑‍🧒‍🧒 Роль пользователя
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CANDIDATE })
  role: UserRole;

  // 🔗 Профиль пользователя
  @OneToOne(() => UserProfileEntity, (profile) => profile.user, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  profile: UserProfileEntity;
}
