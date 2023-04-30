module.exports = {
    db:{
        database: 'livros',
        username: 'postgres',
        password: 'postgres',
        params: {
            dialect: 'postgres',
            define: {
                underscored: true
            }
        }
    },
    jwt: {
        secret: 'secret',
        options: { session: false }
    }
};