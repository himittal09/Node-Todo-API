require('./config/config');
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const {todo} = require('./models/todo.js');
const {user} = require('./models/user.js');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var newtodo = new todo({text: request.body.text});
    newtodo.save().then((result) => {
        response.send(result);
    }, (error) => response.status(400).send(error));
});

app.get('/todos', (request, response) => {
    todo.find().then((todos) => {
        response.send({todos});
    }, (error) => response.status(400).send(error));
});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    todo.findById(id).then((result) => {
        if (!result)
            return response.status(404).send();
        response.status(200).send(result);
    }).catch((error) => response.status(400).send('Todo Not Found'));
});

app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    todo.findByIdAndRemove(id).then((result) => {
        if (!result)
            return response.status(404).send();
        response.status(200).send(result);
    }).catch((error) => response.status(400).send('Todo Not Found'));
});

app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);
    
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    
    if(_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();
    else {
        body.completed = false;
        body.completedAt = null;
    }

    todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo)
            return response.status(404).send();
        response.status(200).send({todo});
    }).catch((error) => response.status(400).send());
});

app.post('/users', (request, response) => {
    var newuser = new user(_.pick(request.body, ['email', 'password']));
    newuser.save().then((result) => {
        response.send(result);
    }, (error) => response.status(400).send(error));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {app};