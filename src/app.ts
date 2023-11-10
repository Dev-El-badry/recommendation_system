import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

import { NotFoundError } from '../common/errors/not-found-error';
import { errorHandler } from '../common/middlewares/error-handler';
import { PROJECT_MESSAGE } from '../constants/project';
import MessageResponse from '../common/interfaces/message-response';
import api from './modules/api.routes';

const app = express()

app.use(express.json({limit: '20kb'}))
app.use(express.urlencoded({extended: true, limit: '10kb'}))

// Implement CORS
app.use(cors())


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('tiny'));
}

if (process.env.NODE_ENV === 'production') {
    const limiter = rateLimit({
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from this API, please try again in an hour',
    });
    app.use('/api', limiter);
}

// Set security HTTP headers
app.use(helmet());

app.use(compression());

app.get<{}, MessageResponse>('/', (req: Request, res: Response) => {
    res.json({
        message: PROJECT_MESSAGE
    })
});

app.use('/api/v1', api);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

app.use(errorHandler);

export default app;