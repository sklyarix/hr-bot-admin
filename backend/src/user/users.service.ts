import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity } from '../user_profile/user_profile.entity';
import { CreateUserDto, UserDto } from './dto/user.dto';

import { UserEntity } from './user.entity';

// TODO Entity не должно быть!

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  async findUserByTgId(idTg: string): Promise<UserDto | null> {
    return await this.userRepository.findOne({
      where: { idTg },
    });
  }

  async findUserByUserId(userId: number): Promise<UserDto | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const { idTg } = dto;
    const isUser = await this.userRepository.findOne({
      where: { idTg },
    });
    if (isUser) {
      throw new ConflictException('The user already exists');
    }
    const user = this.userRepository.create({
      idTg,
      profile: new UserProfileEntity(),
    });
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new ConflictException('The user does not exist');
    }
    return await this.userRepository.remove(user);
  }
}
