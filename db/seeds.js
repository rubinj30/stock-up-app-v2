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
    userName: 'testUser',
    phoneNumber: '7705551212',
    emailAddress: 'jonathan@test.com',
    password: 'password'
});

User.deleteMany({})
    .then(() => jonathan.save())
    .then(() => console.log('SEEDED DATABASE'))
    .then(() => mongoose.connection.close());
