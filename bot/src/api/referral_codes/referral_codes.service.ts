import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { IReferralCode } from '../../shared/referral_code/referral_code.interface';

import { IUser } from '../../shared/user/user.interface';
import { encryptData, instanceBackend } from '../helpers';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReferralCodesService {
  private readonly url: string;
  constructor(private readonly usersApi: UsersService) {
    this.url = `/referral_codes`;
  }

  async createCode(userId: number): Promise<IReferralCode> {
    // 🙊 Шифрование данных
    const { encrypted, iv } = encryptData({ userId });
    const response: AxiosResponse<IReferralCode> = await instanceBackend.post(
      this.url,
      {
        encryptedData: encrypted,
        iv,
      },
    );

    return response.data;
  }

  async findUserByCode(code: string): Promise<IUser> {
    const response: AxiosResponse<IUser> = await instanceBackend.get(
      `${this.url}/${code}`,
    );
    return response.data;
  }

  async getCodeOrCreateCode(idTg: string): Promise<string | Error> {
    const user = await this.usersApi.findUserByIdTg(idTg);
    if (!user) {
      throw new Error('User does not exist');
    }
    const codeResponse: AxiosResponse<IReferralCode | null> =
      await instanceBackend.get(`${this.url}/by-user/${user.id}`);

    const existingCode = codeResponse.data?.code;
    if (existingCode) {
      return existingCode;
    }
    // создаём новый код
    const { code } = await this.createCode(user.id);
    return code;
  }
}
