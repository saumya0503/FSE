const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const session = require('express-session');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use('/', authRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
