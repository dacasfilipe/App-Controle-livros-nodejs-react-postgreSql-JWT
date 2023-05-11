module.exports = {
    // Configuração do banco de dados.
    db:{
        database: 'livros',//nome do banco de dados
        username: 'postgres',
        password: 'postgres',
        params: {
            dialect: 'postgres',//dialeto do banco
            define: {
                // Configuração para usar underscores (em vez de camelCase) nos nomes das tabelas e colunas.
                underscored: true 
            }
        }
    },
    // Configuração do JWT (JSON Web Tokens) para autenticação
    jwt: {
        secret: 'SECRET_TOKEN',
        options: { session: false }
    }
};

