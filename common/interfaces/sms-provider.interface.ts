import { AxiosResponse } from 'axios';

export default interface ISMSProvider {
  sendSMS(to: string, message: string): Promise<AxiosResponse>;
}
