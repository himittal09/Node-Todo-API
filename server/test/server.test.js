const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server.js');
const {todo} = require('./../models/todo');

var initialTodoCount = 0;

beforeEach((done) => {
    todo.find().then((todos) => {
        initialTodoCount = todos.length;
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'This is test text part 5';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((error, response) => {
                if (error)
                    return done(error);
                todo.find().then((todos) => {
                    expect(todos.length).toBe(initialTodoCount+1);
                    expect(todos[initialTodoCount].text).toBe(text);
                    done();
                }).catch((error) => {
                    return done(error);
                });
            });
    });

    it('should not create a todo because of invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, response) => {
                if (error)
                    return done(error);
                todo.find().then((todos) => {
                    expect(todos.length).toBe(initialTodoCount);
                    done();
                }).catch((error) => {
                    return done(error);
                });
            });
    });
});