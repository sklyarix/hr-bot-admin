import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service';
import { CreateReferralDto } from './dto/referral.dto';

import { ReferralEntity } from './referral.entity';

// TODO Entity не должно быть!

@Injectable()
export class ReferralsService {
  constructor(
    @InjectRepository(ReferralEntity)
    private readonly referralRepository: Repository<ReferralEntity>,
    private readonly userService: UsersService,
  ) {}

  // TODO: ERROR добавить
  async create(dto: CreateReferralDto): Promise<ReferralEntity | null> {
    // 🔗 Кто при️гласил
    const referrer = await this.userService.findUserByUserId(dto.referrerId);
    // 🔗️ Кого при️гласили
    const referred = await this.userService.findUserByUserId(dto.referredId);

    if (!referrer || !referred) {
      throw new NotFoundException('User does not exist');
    }

    if (referrer.id === referred.id) {
      throw new BadRequestException('User cannot refer themselves');
    }

    const existingReferral = await this.referralRepository.findOne({
      where: { referred: { id: dto.referredId } },
    });

    if (existingReferral) {
      throw new ConflictException('User is already referred');
    }

    const reverseReferral = await this.referralRepository.findOne({
      where: {
        referrer: { id: dto.referredId },
        referred: { id: dto.referrerId },
      },
    });

    if (reverseReferral) {
      throw new ConflictException(
        'You cannot refer someone who already referred you',
      );
    }

    if (referrer.createdAt > referred.createdAt) {
      throw new ConflictException(
        'You cannot refer a user who registered earlier than you',
      );
    }

    const referral = this.referralRepository.create({
      referrer,
      referred,
    });

    return await this.referralRepository.save(referral);
  }

  async getAllUserReferrals(userId: number): Promise<ReferralEntity[]> {
    return await this.referralRepository.find({
      where: {
        referrer: { id: userId },
      },
      relations: ['referred'],
    });
  }
}
