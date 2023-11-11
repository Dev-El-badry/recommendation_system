import { body } from 'express-validator';

export const signinValidation = [
  body('email').not().isEmpty().isEmail().withMessage('invalid email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password not be empty')
    .isLength({ min: 6, max: 120 })
    .withMessage('password must be above than 2 characters and below than 120 characters'),
];
