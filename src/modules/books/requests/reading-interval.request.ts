import { body } from 'express-validator';
import { Book } from '../models/book.model';

export const readingIntervalValidation = [
  body('book_id')
    .not()
    .isEmpty()
    .isUUID()
    .withMessage('invalid book id')
    .custom((val) => {
      return Book.query()
        .findById(val)
        .then((record) => {
          if (!record) {
            return Promise.reject('book not found');
          }
        });
    })
    .withMessage('book id not found'),
  body('start_page').isInt({ gt: 0 }),
  body('end_page').isInt({ gt: 1 }),
];
