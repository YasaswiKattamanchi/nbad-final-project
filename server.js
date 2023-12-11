const mongoose = require('mongoose');
const express = require('express');
const main_user= require('./models/userModel');
const monthly_expenses = require('./models/monthlyExpenseModel');
const expenses = require('./models/expenseModel');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const compression = require('compression');
const body_parser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
console.log('TLS module is available.');

require('dotenv').config();

const cors_options = {
  origin: 'http://174.138.61.21:3000', 
  credentials: true,
};

app.use(cors(cors_options));
app.use(compression());
app.use(body_parser.json());

// Making a mongoose connection using the domain 
mongoose.connect('mongodb+srv://doadmin:5nW0z9h876gCS21f@db-mongodb-nyc3-73117-ae99b9ab.mongo.ondigitalocean.com/budget?replicaSet=db-mongodb-nyc3-73117&tls=true&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creating a signup for new users using email and password
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await main_user.create({ email, password });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3m' });
    res.json({user, token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creating a sign in for users
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await main_user.findOne({ email, password });
    if (!user) return res.sendStatus(401);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3m' });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creating a new expense with user authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.sendStatus(401); // 401 shows Unauthorized status
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // 403 shows Forbidden status
    }
    req.user = user;
    next();
  });
};

// Logic to generate a new token for authentication
app.post('/renewToken', authenticateToken, (req, res) => {
  const userId = req.header('X-User-ID');
  const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '3m',
  });
  res.json({ token: newToken });
});

app.post('/confBudget', authenticateToken, async (req, res) => {
  try {
    const { description, amount, user } = req.body;
    console.log(req.body);
    const id = user._id;
    const newExpense = await expenses.create({
      description,
      amount,
      user: id,
    });
    res.json(newExpense);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Fetch all expenses associated with the authenticated user
app.get('/expenses', async (req, res) => {
  try {
    const userId = req.header('X-User-ID');
    const expenses = await expenses.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch all expenditure associated with the authenticated user
app.post('/expenditure', authenticateToken, async (req, res) => {
  try {
    const { expense, amount, date, user } = req.body;
    const id = user._id;
    const newMonthlyExpense = await monthly_expenses.create({
      expense,
      amount,
      date,
      user: id,
    });

    res.json(newMonthlyExpense);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Fetch all monthly expenses associated with the authenticated user
app.get('/montlyExpenses', async (req, res) => {
  try {
    const userId = req.header('X-User-ID');
    const expenses = await monthly_expenses.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Server is running on the below port
app.listen(port, '134.122.10.110', () => {
  console.log(`Server is running on port ${port}`);
});
