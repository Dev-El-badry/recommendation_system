import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { topRecommentationBooksRepo } from '../services/reading-intervals.service';

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.query();

  res.status(200).json({
    data: books,
  });
};

export const getRecommendationBooks = async (req: Request, res: Response) => {
  const data = await topRecommentationBooksRepo();
  res.status(200).json({
    data,
  });
};
