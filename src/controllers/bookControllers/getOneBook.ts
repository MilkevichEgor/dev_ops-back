import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

export const getOneBook: Handler = async (req, res, next) => {
  try {
    const bookId = +req.params.id;
    const book = await db.book.findOne({ where: { bookId } });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'Book not found');
    }

    return res.status(StatusCodes.OK).json({ book });
  } catch (err) {
    next(err);
  }
};

export default getOneBook;