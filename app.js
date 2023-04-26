const express = require('express');
const cors = require("cors");
const app = express();
const consign = require('consign');
const port = 3001;
const bodyParser = require('body-parser');
// middleware CORS adicionado antes das rotas para permitir acesso de outros domínios
app.use(cors());

//autenticação jwt
consign()
		.include('db.js')
		.then('models')
        .then('associations.js')
		.then('auth.js')
		.then('middlewares.js')
		.then('routes')
		.then('boot.js')
		.into(app);

app.use(app.auth.initialize())
app.set('json	spaces',	4);
app.use((req,	res,	next)	=>	{
    delete	req.body.id;
    next();
});

// Configura o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Arquivos com rotas para o cadastro de livros, autores e editoras
const livros = require('./livros');
const autores = require('./autores');
const editoras = require('./editoras');

app.use('/livros', livros);
app.use('/autores', autores);
app.use('/editoras', editoras);

// Exemplo de rota
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// para reconhecer os dados recebidos como sendo um objeto em formato json
app.use(express.json());
app.post('/filmes', (req, res) => {
    const { titulo, genero } = req.body;
    res.send(`Filme:${titulo} , Genero:${genero} , recebido ...`);
})

// Exemplo de Middleware
const log = (req, res, next) => {
    console.log(`......Acessado em ${new Date().toLocaleString()}`);
}

app.get('/transfere', log, (req, res) => {
    res.send('Ok. valor transferido com sucesso.');
})

app.listen(port, () => {
    console.log(`App livros rodando em http://localhost:${port}`);
})
