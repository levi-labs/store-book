const { Transaction, DetailTransaction, Book } = require('../../db/models');
const { Op } = require('sequelize');
const sequelize = require('../../db/models').sequelize;

module.exports = {
  checkOut: async (req, res, next) => {
    const trans = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await Transaction.create(
        {
          invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date(),
          user: user,
        },
        { transaction: trans }
      );
      let errBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkBook = await Book.findOne({
          where: { id: payload[i].bookId, user: user },
        });

        // console.log(checkBook.title);
        //add field create detail transaction
        payload[i].transaction = transaction.id;
        payload[i].titleBook = checkBook?.title;
        payload[i].book = checkBook?.id;
        payload[i].imageBook = checkBook?.image;
        payload[i].priceBook = checkBook?.price;
        payload[i].user = user;

        updateStock.push({
          id: payload[i].bookId,
          stock: checkBook?.stock - payload[i].quantity,
          user: user,
        });

        if (payload[i]?.quantity > checkBook?.stock) {
          errorBookIdStock.push(
            `${payload[i]?.quantity} - ${checkBook?.stock}`
          );
        }
        if (!checkBook) {
          errBookIdNotFound.push(payload[i]?.bookId);
        }
      }

      if (errorBookIdStock.length !== 0) {
        return res.status(400).json({
          message: `book stock is not enough with id : ${errorBookIdStock.join(
            ', '
          )} and user : ${user}`,
        });
      }
      if (errBookIdNotFound.length !== 0) {
        return res.status(400).json({
          message: `no books with id : ${errBookIdNotFound.join(
            ', '
          )} and user : ${user}`,
        });
      }
      await Book.bulkCreate(
        updateStock,
        {
          updateOnDuplicate: ['stock'],
        },
        { transaction: trans }
      );

      const detailTrans = await DetailTransaction.bulkCreate(payload, {
        transaction: trans,
      });

      await trans.commit();

      res.status(201).json({ message: 'success checkout', data: detailTrans });
    } catch (error) {
      if (trans) await trans.rollback();
      next(error);
    }
  },
};
