import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import type { UserProfileDto } from '../../user_profile/dto/user_profile.dto';
import { UserRole } from '../enums/user-role.enum';

// TODO: implements ICreateUser
// TODO: implements ICreateUser
export class CreateUserDto {
  @IsString()
  @Matches(/^\d+$/, { message: 'Invalid idTG' })
  idTg: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsOptional()
  profile?: UserProfileDto;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  idTg?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  profile?: UserProfileDto;
}

export class GetUserByTgDto {
  @IsString()
  idTg: string;
}

export class UserDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  idTg: string;
  role: UserRole;
  profile: UserProfileDto;
}
