describe('Routes: Token', () => {
    const Users = app.db.models.Users;
    describe('POST /token', () => {
        //a função beforeEach é executada antes de cada teste
        //ela cadastra um usuário para ser usado nos testes
        beforeEach(async ()=> {
            
        });
        describe('status 200', () => {
            it('returns authenticated user token', done => {
                //código de teste
            });
        });
        describe('status 401', () => {
            it('throws error when password is incorrect', done => {
                //código de teste
            });
            it('throws error when email not exist', done => {
                //código de teste
            });
            it('throws error when email and password are blank', done => {
                //código de teste
            });
        });
    });
});