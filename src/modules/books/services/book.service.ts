import { Book } from '../models/book.model';

export const getNumOfPages = async (book_id: string): Promise<Book> => {
  const record = await Book.query().findById(book_id);
  return record!;
};
