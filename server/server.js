const mongoose = require('./db/mongoose.js');
const todo = require('./models/todo.js');
const user = require('./models/user.js');
const express = require('express');
const bodyParser = require('body-parser');

/*
var newTodo = new todo({
    text: 'some text',
    completed: false,
});

newTodo.save().then((document) => {
    console.log(`Todo saved: ${document}`);
}, (error) => {
    console.log(`Error ocured: ${error}`);
});

var newuser = new user({
    username: 'mittal0109',
    email: 'mittal01091997@gmail.com'
});

newuser.save().then((document) => {
    console.log(`User saved: ${document}`);
}, (error) => {
    console.log(`Error ocured: ${error}`);
});
*/

