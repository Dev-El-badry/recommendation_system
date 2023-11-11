import express from 'express';
import { getBooks, getRecommendationBooks } from '../controllers/books.controller';

const router = express.Router();

router.get('/', getBooks);
router.get('/top-recommendations', getRecommendationBooks);

export { router as bookRoutes };
