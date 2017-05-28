const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const {todo} = require('./models/todo.js');
const {user} = require('./models/user.js');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var newtodo = new todo(request.body);
    newtodo.save().then((result) => {
        response.send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos', (request, response) => {
    todo.find().then((todos) => {
        response.send({todos});
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    todo.findById(id).then((result) => {
        if (!result)
            return response.status(404).send();
        response.status(200).send(result);
    }).catch((error) => {
        response.status(400).send('Todo Not Found');
    });
});

app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    todo.findByIdAndRemove(id).then((result) => {
        if (!result)
            return response.status(404).send();
        response.status(200).send(result);
    }).catch((error) => {
        response.status(400).send('Todo Not Found');
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {app};