require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true }
);

const User = require('./models/User');

const jonathan = new User({
    firstName: 'Jonathan',
    lastName: 'Rubin',
    userName: 'jrubin',
    phoneNumber: '7705551212',
    emailAddress: 'jonathan@test.com',
    password: 'password'
});

const lindsay = new User({
    firstName: 'Lindsay',
    lastName: 'Lindsay',
    userName: 'lindsayG',
    phoneNumber: '7705551212',
    emailAddress: 'lindsay@test.com',
    password: 'password'
});

User.deleteMany({})
    .then(() => jonathan.save())
    .then(() => lindsay.save())
    .then(() => console.log('SEEDED DATABASE'))
    .then(() => mongoose.connection.close());
