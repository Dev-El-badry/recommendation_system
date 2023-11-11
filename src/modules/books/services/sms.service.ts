import { AxiosResponse } from 'axios';
import ISMSProvider from '@common/interfaces/sms-provider.interface';
import { SMSV1Provider } from '../providers/sms-v1.provider';
import { SMSV2Provider } from '../providers/sms-v2.provider';

export default class SMSSerivce {
  private smsProvider: ISMSProvider;

  public constructor() {
    const useSmsProviderV1 = process.env.USE_SMS_PROVIDER_1 === 'true';
    this.smsProvider = useSmsProviderV1 ? new SMSV1Provider() : new SMSV2Provider();
  }

  public async sendThankYouSMS(to: string, username: string): Promise<AxiosResponse> {
    const message = `Thank you, ${username}, for submitting your reading interval!`;
    return this.smsProvider.sendSMS(to, message);
  }
}
