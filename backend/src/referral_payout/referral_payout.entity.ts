import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobApplicationEntity } from '../job_application/job_application.entity';

import { ReferralEntity } from '../referral/referral.entity';
import { EnumReferralPayoutStatus } from './enums/referral_payout_status.enum';

@Entity({ name: 'referral_payouts' })
export class ReferralPayoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // 💰Количество выплаты
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  // ℹ️ Статус
  @Column({
    type: 'enum',
    enum: EnumReferralPayoutStatus,
    default: EnumReferralPayoutStatus.PENDING,
  })
  status: EnumReferralPayoutStatus;

  //  🔗️️ Реферал
  @OneToOne(() => ReferralEntity, (referral) => referral.payout, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referralId' })
  referral: ReferralEntity;

  // ‍🔗️ Отклик
  @OneToOne(() => JobApplicationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobApplicationId' })
  jobApplication: JobApplicationEntity;
}
