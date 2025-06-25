import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service';
import { UserProfileDto } from './dto/user_profile.dto';

import { UserProfileEntity } from './user_profile.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepository: Repository<UserProfileEntity>,
    private readonly usersService: UsersService,
  ) {}

  async updateUserProfile(idTg: string, profileDto: UserProfileDto) {
    // TODO КОЛХОЗ!
    const user = await this.usersService.findUserByTgId(idTg);
    if (!user) {
      throw new NotFoundException('User profile does not exist');
    }
    await this.userProfileRepository.update(
      { user },
      {
        fullName: profileDto.fullName,
        age: profileDto.age,
        city: profileDto.city,
      },
    );

    return await this.usersService.findUserByTgId(idTg);
  }
}
