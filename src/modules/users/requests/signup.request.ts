import { body } from 'express-validator';
import { User } from '@module/users/models/user.model';

export const signupValidation = [
  body('first_name').not().isEmpty().isLength({ min: 2, max: 120 }).withMessage('first name not be empty'),
  body('last_name').not().isEmpty().isLength({ min: 2, max: 120 }).withMessage('first name not be empty'),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('please insert valid phone')
    .custom((val) => {
      return User.query()
        .where({ email: val })
        .first()
        .then((record) => {
          if (record) {
            return Promise.reject('email is already exists');
          }
        })
        .catch(() => {
          return Promise.reject('email is already exists');
        });
    }),
  body('password')
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 120 })
    .withMessage('password must be above than 2 characters and below than 120 characters'),
];
