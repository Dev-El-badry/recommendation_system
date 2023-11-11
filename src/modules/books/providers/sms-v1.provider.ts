import axios, { AxiosResponse } from 'axios';
import ISMSProvider from '@common/interfaces/sms-provider.interface';

export class SMSV1Provider implements ISMSProvider {
  private apiUrl = 'https://run.mocky.io/v3/8eb88272-d769-417c-8c5c-159bb023ec0a';

  public async sendSMS(to: string, message: string): Promise<AxiosResponse> {
    const data = { to, message };
    return axios.post(this.apiUrl, data);
  }
}
