import db from '@config/database/db-config';
import { tables } from '@constants/tables.enum';
import IRecommendationBook from '@common/interfaces/recommendation-books.interface';
import { ReadingInterval } from '../models/reading-interval.model';
import INewInterval from '@common/interfaces/interval.interface';

export const topRecommentationBooksRepo = async (): Promise<IRecommendationBook[]> => {
  const LIMIT = 5;

  const query = `
    SELECT
      b.id AS book_id,
      b.title AS book_name,
      b.num_of_pages,
      SUM(ri.end_page - ri.start_page + 1) AS num_of_read_pages
    FROM
      ${tables.READING_INTERVALS} ri
    JOIN
      ${tables.BOOKS} b ON ri.book_id = b.id
    GROUP BY
      ri.book_id, b.title, b.id
    ORDER BY
      num_of_read_pages DESC
    LIMIT ${LIMIT}
  `;
  const { rows } = await db.raw<{ rows: IRecommendationBook[] }>(query);
  return rows;
};

export const getHightestEndPage = async (user_id: string, book_id: string) => {
  const highestEndPage = (await ReadingInterval.query().max('end_page').where({ user_id, book_id }).first()) as any;

  return highestEndPage.max;
};

export const submitNewInterval = async (data: INewInterval): Promise<ReadingInterval> => {
  const createdInterval = await ReadingInterval.query().insert(data).returning('*');
  return createdInterval;
};
