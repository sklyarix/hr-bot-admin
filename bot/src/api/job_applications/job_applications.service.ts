import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { EnumJobApplicationStatus } from '../../shared/enums/job_application_status.enum';
import {
  ICreateJobApplication,
  IJobApplication,
} from '../../shared/job_application/job_application.interface';

import { encryptData, instanceBackend } from '../helpers';

@Injectable()
export class JobApplicationsService {
  private readonly url: string;
  constructor() {
    this.url = `/job_applications`;
  }

  async create(data: ICreateJobApplication): Promise<IJobApplication> {
    // 🙊 Шифрование данных
    const { encrypted, iv } = encryptData(data);
    const response: AxiosResponse<IJobApplication> = await instanceBackend.post(
      this.url,
      {
        encryptedData: encrypted,
        iv,
      },
    );
    return response.data;
  }

  async getAllByUserId(id: string): Promise<IJobApplication[]> {
    const response: AxiosResponse<IJobApplication[]> =
      await instanceBackend.get(`${this.url}/user/${id}`);
    return response.data;
  }

  async getAllByUsersIds(userIds: number[]): Promise<IJobApplication[]> {
    const queryString = userIds.join(',');
    const response: AxiosResponse<IJobApplication[]> =
      await instanceBackend.get(`${this.url}/users?ids=${queryString}`);
    return response.data;
  }

  async getDetailById(id: number): Promise<IJobApplication> {
    const response: AxiosResponse<IJobApplication> = await instanceBackend.get(
      `${this.url}/detail/${id}`,
    );
    return response.data;
  }

  async updateStatus(
    id: number,
    status: EnumJobApplicationStatus,
  ): Promise<IJobApplication> {
    const { encrypted, iv } = encryptData({ status });
    const response: AxiosResponse<IJobApplication> = await instanceBackend.put(
      `${this.url}/${id}/status`,
      {
        encryptedData: encrypted,
        iv,
      },
    );
    return response.data;
  }
}
