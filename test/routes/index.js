//para rodar o teste, execute o comando: npm test
describe('Routes: Index', () => {
    describe('GET /', () => {
        it('returns the API status', done => {
            request.get('/')
                .expect(200)
                .end((err, res) => {
                    const expected = { status: 'NTask API' };
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
})