const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./app/api/auth/router');
const categorieshRouter = require('./app/api/categories/router');
const booksRouter = require('./app/api/books/router');
const uploadRouter = require('./app/api/uploads/router');
const checkOut = require('./app/api/checkout/router');
const transactionRouter = require('./app/api/transactions/router');
const URL = `/api/v1`;
// const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api toko buku' });
});

app.use(`${URL}`, authRouter);
app.use(`${URL}`, categorieshRouter);
app.use(`${URL}`, booksRouter);
app.use(`${URL}`, uploadRouter);
app.use(`${URL}`, checkOut);
app.use(`${URL}`, transactionRouter);
// app.use('/users', usersRouter);

module.exports = app;
