const { Transaction, DetailTransaction, Book } = require('../../db/models');
const { Op } = require('sequelize');

const sequelize = require('../../db/models').sequelize;

module.exports = {
  getTransactionList: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { keyword = '' } = req.query;
      const user = req.user.id;

      let condition = {
        user: user,
      };

      if (keyword !== '') {
        condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } };
      }
      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: 'detailTransaction',
        },
      });

      res.status(200).json({
        message: 'success get all transaction',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },
  getDetailTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;

      const detailTransaction = await Transaction.findOne({
        where: { id: id },
        include: {
          model: DetailTransaction,
          as: 'detailTransaction',
        },
      });

      res.status(200).json({
        message: 'success get all transaction',
        data: detailTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
};
