require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
// const methodOverride = require('method-override');
// const logger = require('morgan');

// Database setup
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;

connection.on('open', () => {
    console.log('Mongoose Connected Successfully');
});

connection.on('error', error => {
    console.log(error);
});

const app = express();
app.use(bodyParser.json())

const UsersController = require('./routes/users')
app.use('/api/users', UsersController)

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('App is up and running on port ' + PORT);
});
