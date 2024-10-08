const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const LogInCollection = require('./mongodb');
const { engine } = require('express-handlebars');
const path = require('path');
const crypto = require('crypto');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../client'));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home', layout: false });
});

app.get('/productpage', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('productpage', { title: 'Product Page', layout: false });
});

app.get('/login', (req, res) => {
    res.render('login', { 
        title: 'Login and Signup', 
        layout: false, 
        error: req.flash('error'),
        success: req.flash('success')
    });
});

app.post('/login', async (req, res) => {
    const { email, password, phone, confirm_password } = req.body;
    const isSignup = phone && confirm_password;
    function generateRandomToken() {
        return crypto.randomBytes(16).toString('hex'); 
    }
 const token = generateRandomToken();
    if (isSignup) {
        // Signup logic
        if (password !== confirm_password) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }

        try {
            const existingUser = await LogInCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists.' });
            }

            const newUser = new LogInCollection({ email, phone, password });
            await newUser.save();

            return res.status(200).json({ success: 'Registration successful! You can now log in.' });
        } catch (err) {
            console.error('Error during sign up:', err);
            return res.status(500).json({ error: 'Something went wrong. Please try again.' });
        }
    } else {
        
try {
    const user = await LogInCollection.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Email not registered.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect password.' });
    }

    req.session.user = { id: user._id, email: user.email };
 
    return res.status(200).json({ success: 'Login successful', token: token });
} catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});