import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { UserDto } from '../user/dto/user.dto';

import { UsersService } from '../user/users.service';
import {
  type ReferralCodeDto,
  ReferralCodeFullDto,
} from './dto/referral_code.dto';

import { ReferralCodeEntity } from './referral_codes.entity';

@Injectable()
export class ReferralCodesService {
  private generateRefCode(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`; // например: "a7f4x9zq"
  }
  constructor(
    @InjectRepository(ReferralCodeEntity)
    private readonly referralCodesRepository: Repository<ReferralCodeEntity>,
    private readonly userService: UsersService,
  ) {}

  async create(userId: number): Promise<ReferralCodeFullDto | Error> {
    const currentReferralCode = await this.findCodeByUserId(userId);

    if (currentReferralCode) {
      return new Error('Referral Code already exists');
    }

    const user = await this.userService.findUserByUserId(userId);
    if (!user) {
      return new Error('User does not exist');
    }

    const code = this.generateRefCode();

    const refCode = this.referralCodesRepository.create({
      code,
      user,
    });

    return await this.referralCodesRepository.save(refCode);
  }

  async findCodeByUserId(userId: number): Promise<ReferralCodeEntity | null> {
    return await this.referralCodesRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findUserByCode(code: string): Promise<UserDto | null> {
    const referralCodeEntity = await this.referralCodesRepository.findOne({
      where: {
        code: code,
      },
      relations: ['user'],
    });
    return referralCodeEntity?.user || null;
  }
}
