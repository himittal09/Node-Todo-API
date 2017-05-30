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
/******************************************************************************/
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
                }).catch((error) => done(error));
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
                }).catch((error) => done(error));
            });
    });
});
/******************************************************************************/
describe('GET /todos', () => {

    it('should retrun all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(initialTodoCount)
            })
            .end(done);
    });
});
/******************************************************************************/
describe('GET /todos/:id', () => {

    it('should return 404 for invalid ObjectID', (done) => {
        request(app)
            .get('/todos/wrongod')
            .expect(404)
            .end(done);
    });

    it('should return 404 for ObjectID not found', (done) => {
        request(app)
            .get('/todos/5923cb3cf53ee810fc649b12')
            .expect(404)
            .end(done);
    });
    
    it('should return todo with 200 or valid ObjectID', (done) => {
        request(app)
            .get('/todos/5923cb3cf53ee810fc649b11')
            .expect(200)
            .expect((response) => {
                expect(response.body._id).toBe('5923cb3cf53ee810fc649b11');
                expect(response.body.text).toBe('some text');
            })
            .end(done);
    });
});
/******************************************************************************/
describe('DELETE /todos/:id', () => {
    it('should return a 404 for invalid ObjectID', (done) => {});
    it('should return a deleted todo', (done) => {});
    it('should return a 404 for ObjectID not found', (done) => {});
});
/******************************************************************************/
describe('PATCH /todos/:id', () => {
    it('should return a 404 for invalid ObjectID', (done) => {});
    it('should return a updated todo', (done) => {});
    it('should return a 404 for ObjectID not found', (done) => {});
});