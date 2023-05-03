const jwt = require('jwt-simple');

describe('Routes: Tasks', () => {
    const Users = app.models.users;
    const Tasks = app.models.tasks;
    let token;
    let fakeTask;
    beforeEach(done => {
        //código de teste
    });

    describe('GET /tasks', () => {
        describe('status 200', () => {
            it('returns a list of tasks', done => {
                //código de teste
            });
        });
    });

    describe('POST /tasks/', () => {
        describe('status 200', () => {
            it('creates a new task', done => {
                //código de teste
            });
        });
    });

    describe('GET /tasks/:id', () => {
        describe('status 200', () => {
            it('returns one task', done => {
                //código de teste
            });
        });
        describe('status 404', () => {
            it('throws error when task not exist', done => {
                //código de teste
            });
        });
    });

    describe('PUT /tasks/:id', () => {
        describe('status 204', () => {
            it('updates a task', done => {
                //código de teste
            });
        });
    });

    describe('DELETE /tasks/:id', () => {
        describe('status 204', () => {
            it('removes a task', done => {
                //código de teste
            });
        });
    });
});