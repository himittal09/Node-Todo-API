const mongoose = require('mongoose');
const {todo} = require('./models/todo.js');
const {user} = require('./models/user.js');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, respond) => {
    var newtodo = new todo(request.body);
    newtodo.save().then((result) => {
        respond.send(`Note Saved: ${result}`);
        console.log(result);
    }, (error) => {
        respond.status(400 ).send(`Error Occured: ${error}`);
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});