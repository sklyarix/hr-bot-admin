import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReferralPayoutEntity } from '../referral_payout/referral_payout.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'referrals' })
export class ReferralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 🕛 Временные метки
  @CreateDateColumn()
  createdAt: Date;

  // 🔗 Кто при️гласил
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'referrerId' })
  referrer: UserEntity;

  // 🔗️Кого при️гласили
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'referredId' })
  referred: UserEntity;

  // ⛓️Выплаты
  @OneToOne(() => ReferralPayoutEntity, (payout) => payout.referral)
  payout: ReferralPayoutEntity;
}
