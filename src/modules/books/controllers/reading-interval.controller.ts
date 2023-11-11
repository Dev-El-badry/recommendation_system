import { Request, Response } from 'express';
import { getHightestEndPage, submitNewInterval } from '../services/reading-intervals.service';
import { User } from '@module/auth/models/user.model';
import { BadRequestError } from '@common/errors/bad-request-error';
import INewInterval from '@common/interfaces/interval.interface';
import { getNumOfPages } from '../services/book.service';
import SMSSerivce from '../services/sms.service';

export const submitInterval = async (req: Request, res: Response) => {
  const { start_page, end_page, book_id } = req.body;
  const user: User = req.currentUser as User;

  const highestEndPage = await getHightestEndPage(user.id, book_id);
  if (start_page <= highestEndPage) {
    throw new BadRequestError('Error: New interval must be higher than the last interval');
  }

  const { num_of_pages } = await getNumOfPages(book_id);
  if (end_page > num_of_pages) {
    throw new BadRequestError('Error: New interval must be lower than or equal the number of pages');
  }

  const data: INewInterval = {
    start_page,
    end_page,
    book_id,
    user_id: user.id,
  };

  const record = await submitNewInterval(data);

  //send SMS
  const smsService = new SMSSerivce();
  smsService
    .sendThankYouSMS(user.email, `${user.first_name} ${user.last_name}`)
    .then(() => {
      // console.log('SMS Sent successfully');
    })
    .catch((error) => {
      console.error('Error sending SMS:', error.message);
    });

  res.status(200).json({
    data: record,
  });
};
