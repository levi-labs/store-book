const { Book, Category } = require('../../db/models');
const { Op } = require('sequelize');
const book = require('../../db/models/book');
module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = ' ', category = ' ' } = req.query;
      let condition = {
        user: req.user.id,
      };
      if (keyword !== '') {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }
      if (category !== ' ') {
        condition = { ...condition, category: category };
      }
      //   console.log(keyword);
      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ['id', 'name'],
        },
      });
      res.status(200).json({ message: 'success get all books', data: books });
    } catch (err) {
      next(err);
    }
  },

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { title, category, author, image, published, price, stock } =
        req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        },
      });
      if (!checkCategory) {
        res.status(404).json({ message: 'id category not found..!' });
      }
      const books = await Book.create({
        title: title,
        user: user,
        category: category,
        author: author,
        image: image,
        published: published,
        price: price,
        stock: stock,
      });
      res.status(200).json({ message: 'success create book', data: books });
    } catch (err) {
      next(err);
    }
  },
  updateBooks: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user.id;
      const { title, category, author, image, published, price, stock } =
        req.body;
      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        },
      });
      if (!checkCategory) {
        res.status(404).json({ message: 'id category not found..!' });
      }
      const checkBook = await Book.findOne({
        where: {
          id: id,
        },
      });
      if (!checkBook) {
        res.status(404).json({ message: 'id book not found' });
      }

      const books = await checkBook.update({
        title: title,
        user: user,
        category: category,
        author: author,
        image: image,
        published: published,
        price: price,
        stock: stock,
      });
      res.status(201).json({ message: 'success update book', data: books });
    } catch (err) {
      next(err);
    }
  },
  deleteBooks: async (req, res, next) => {
    try {
      const books = await Book.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!books) {
        res.status(404).json({ message: 'id book not found' });
      }

      books.destroy();

      res.status(201).json({ message: 'success delete book', data: books });
    } catch (error) {
      next(error);
    }
  },
};
