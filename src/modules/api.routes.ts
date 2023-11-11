import express, { Request, Response } from 'express';

import MessageResponse from '../../common/interfaces/message-response';
import { PROJECT_API_MESSAEG } from '../../constants/project';
import { authRouter } from './users/routes/api.route';

const router = express.Router();

router.use('/auth', authRouter);

router.get<any, MessageResponse>('/', (req: Request, res: Response) => {
  res.json({
    message: PROJECT_API_MESSAEG,
  });
});

export default router;
