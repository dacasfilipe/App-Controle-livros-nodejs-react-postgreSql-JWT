const { request } = require("express");

describe('Routes: Token', () => {
    const Users = app.db.models.Users;
    describe('POST /token', () => {
        //a função beforeEach é executada antes de cada teste
        //ela cadastra um usuário para ser usado nos testes
        beforeEach(async ()=> {
            await Users.destroy({where: {}});
            await Users.create({
                name: 'John',
                email: 'john@mail.net',
                password: '12345'
        });
    });
        describe('status 200', () => {
            it('returns authenticated user token', done => {
                //caso de teste de usuário autenticado
                request.post('/token')
                .send({
                    email: 'john@mail.net',
                    password: '12345'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.include.keys('token');
                    done(err);
                });
            });
        });
        describe('status 401', () => {
            it('throws error when password is incorrect', done => {
                //caso de teste de senha incorreta
                request.post('/token')
                .send({
                    email: 'john@mail.net',
                    password: 'SENHA_ERRADA'
                })
                .expect(401)
                .end(done);
            });
            it('throws error when email not exist', done => {
                //caso de teste de email inexistente
                request.post('/token')
                .send({
                    email: 'EMAIL_ERRADO',
                    password: 'SENHA_ERRADA'
                })
                .expect(401)
                .end(done);
            });
            it('throws error when email and password are blank', done => {
                //código de teste
            });
        });
    });
});