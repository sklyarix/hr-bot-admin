import { Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';

import {
  ICreateReferral,
  IReferral,
} from '../../shared/referral/referral.interface';

import { encryptData, instanceBackend } from '../helpers';

import { UsersService } from '../users/users.service';

@Injectable()
export class ReferralsService {
  private readonly url: string;
  constructor(private readonly usersApi: UsersService) {
    this.url = `/referrals`;
  }

  async create(users: ICreateReferral): Promise<IReferral> {
    const { encrypted, iv } = encryptData(users);
    const response: AxiosResponse<IReferral> = await instanceBackend.post(
      this.url,
      {
        encryptedData: encrypted,
        iv,
      },
    );

    return response.data;
  }

  async getInvitedUsersByIdTg(tgId: string) {
    const userReferrer = await this.usersApi.findUserByIdTg(tgId);

    const responseAllReferral: AxiosResponse<IReferral[]> =
      await instanceBackend.get(`${this.url}/user/${userReferrer.id}`);

    return responseAllReferral.data;
  }
}
//: Promise<[{ name: string; status: EnumJobApplicationStatus }] | Error>
