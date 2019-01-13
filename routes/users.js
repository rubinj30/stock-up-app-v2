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

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
