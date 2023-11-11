import axios, { AxiosResponse } from 'axios';
import ISMSProvider from '@common/interfaces/sms-provider.interface';

export class SMSV2Provider implements ISMSProvider {
  private apiUrl = 'https://run.mocky.io/v3/268d1ff4-f710-4aad-b455-a401966af719';

  public async sendSMS(to: string, message: string): Promise<AxiosResponse> {
    const data = { to, message };
    return axios.post(this.apiUrl, data);
  }
}
