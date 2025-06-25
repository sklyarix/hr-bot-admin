import { IsInt } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class UserIdReferralCodeDto {
  @IsInt()
  userId: number;
}

export class ReferralCodeFullDto {
  id: number;
  createdAt: Date;
  code: string;
  user: UserDto;
}

export class ReferralCodeDto {
  id: number;
  createdAt: Date;
  code: string;
  userId: number;
}
