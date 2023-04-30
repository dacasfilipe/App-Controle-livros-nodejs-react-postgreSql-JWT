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
        secret: 'SECRET_TOKEN',
        options: { session: false }
    }
};

