const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./app/api/auth/router');
const categorieshRouter = require('./app/api/categories/router');
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
// app.use('/users', usersRouter);

module.exports = app;
