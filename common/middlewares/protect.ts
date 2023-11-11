import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NoAuthorizedError } from '../errors/no-authorized-error';
import { User } from '@module/auth/models/user.model';
interface IPayload {
  id: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Request {
      currentUser: IPayload;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token!: string;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new NoAuthorizedError();
  }

  const decode: any = await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  const currentUser = await User.query().findById(decode.id);
  if (!currentUser) {
    throw new NoAuthorizedError();
  }

  req.currentUser = currentUser;

  next();
};
