import express, { Request, Response } from 'express';

import MessageResponse from '../../common/interfaces/message-response';
import { PROJECT_API_MESSAEG } from '../../constants/project';
import { authRouter } from './auth/routes/api.route';
import { bookRoutes } from './books/routes/book.route';
import { readingIntervalRouter } from './books/routes/reading-interval.route';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/books', bookRoutes);
router.use('/reading-intervals', readingIntervalRouter);

router.get<any, MessageResponse>('/', (req: Request, res: Response) => {
  res.json({
    message: PROJECT_API_MESSAEG,
  });
});

export default router;
