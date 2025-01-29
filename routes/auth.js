const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => res.render('register'));

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
            if (err) throw err;
            res.redirect('/login');
        });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length == 0) return res.redirect('/login');
        bcrypt.compare(password, results[0].password, (err, result) => {
            if (result) {
                req.session.user = results[0];
                res.redirect('/dashboard');
            } else {
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;
