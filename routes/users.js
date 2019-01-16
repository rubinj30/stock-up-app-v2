const express = require('express');
const User = require('../db/models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        const savedUser = await User.create(newUser);
        res.json(savedUser);
    } catch (err) {
        console.log(err);
        res.statusCode(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        console.log(req.body);
        const user = await User.find({ emailAddress: emailAddress });
        if (user.length < 1) {
            res.json({ error: 'That e-mail does not belong to a user' });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { emailAddress } = req.body;
        console.log(req.body);
        const user = await User.find({ emailAddress: emailAddress });
        if (user.length > 0) {
            res.json({
                error:
                    'A user with that e-mail address already exists. Please login or use a different e-mail.'
            });
        } else {
            const savedUser = await User.create(req.body);
            res.json(savedUser);
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
