import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { BadRequestError } from '@common/errors/bad-request-error';

export const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: '90d' });
};

export const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.id);

  delete user.password;
  res.status(statusCode).json({
    status: 'success',
    access_token: token,
    data: user.toJson(),
  });
};

export const sigin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.query()
    .findOne({
      email,
    })
    .catch((err) => console.log(err));

  if (!userExists) throw new BadRequestError('invalid credentials');

  const validPassword = await userExists.correctPassword(password);
  if (!validPassword) {
    throw new BadRequestError('invalid credentials');
  }

  createSendToken(userExists, 200, res);
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) return res.status(200).json({ data: null });
  req.params.id = (req.currentUser as User).id;
  next();
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.query()
    .findById(id)
    .returning('*')
    .catch((err) => console.log(err));
  if (!user) return res.status(200).json({ data: null });

  res.status(200).json({ data: user.toJson() });
};

export const signup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  const createUser = {
    first_name,
    last_name,
    email,
    password,
  };
  const createdUser = await User.query().insert(createUser).returning('*');

  createSendToken(createdUser, 200, res);
};
