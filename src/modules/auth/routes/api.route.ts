import express from 'express';
import { signinValidation } from '../requests/signin.request';
import { validateRequest } from '@common/middlewares/validate-request';
import { getMe, getUser, sigin, signup } from '@module/auth/controllers/authentication.controller';
import { protect } from '@common/middlewares/protect';
import { signupValidation } from '../requests/signup.request';

const router = express.Router();

router.post('/signin', signinValidation, validateRequest, sigin);
router.post('/signup', signupValidation, validateRequest, signup);

router.get('/me', protect, getMe, getUser);

export { router as authRouter };
