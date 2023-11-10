import express, { Request, Response } from 'express';

import MessageResponse from '../../common/interfaces/message-response';
import { PROJECT_API_MESSAEG } from '../../constants/project';

const router = express.Router()

router.get<{}, MessageResponse>('/', (req: Request, res: Response) => {
  res.json({
    message: PROJECT_API_MESSAEG
  });
});

export default router;