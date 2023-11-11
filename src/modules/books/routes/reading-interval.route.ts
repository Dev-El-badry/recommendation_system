import express from 'express';
import { readingIntervalValidation } from '../requests/reading-interval.request';
import { validateRequest } from '@common/middlewares/validate-request';
import { submitInterval } from '../controllers/reading-interval.controller';
import { protect } from '@common/middlewares/protect';

const router = express.Router();

router.post('/', protect, readingIntervalValidation, validateRequest, submitInterval);

export { router as readingIntervalRouter };
