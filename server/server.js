require('./config/config');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const port = process.env.PORT;
const {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var todo = new Todo({text: request.body.text});
    todo.save().then((result) => {
        response.send(result);
    }, (error) => response.status(400).send(error));
}); // test written

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({todos});
    }, (error) => response.status(400).send(error));
}); // test written

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    Todo.findById(id).then((result) => {
        if (!result)
            return response.status(404).send();
        response.status(200).send(result);
    }).catch((error) => response.status(400).send('Todo Not Found'));
}); // test written

app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id))
        return response.status(404).send();
    Todo.findByIdAndRemove(id).then((result) => {
        if (!result)
            return response.status(404).send();
        response.status(200).send(result);
    }).catch((error) => response.status(400).send('Todo Not Found'));
}); // test written

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

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo)
            return response.status(404).send();
        response.status(200).send({todo});
    }).catch((error) => response.status(400).send());
}); // test written

app.post('/users', (request, response) => {
    var body = _.pick(request.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        response.header('x-auth', token).send(user);
    }).catch((error) => response.status(400).send(error));
}); // test written

app.get('/users/me', authenticate, (request, response) => {
    response.send(request.user);
}); // test written

app.post('/users/login', (request, response) => {
    body = _.pick(request.body, ['email', 'password']);

    User.findByCredentials(body).then((user) => {
        return user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(user);
        });
    }).catch((error) => response.status(400).send());
}); // test written

app.delete('/users/me/token', authenticate, (request, response) => {
    request.user.removeToken(request.token).then(() => {
        response.status(200).send();
    }).catch(() => response.status(200).send());
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {app};