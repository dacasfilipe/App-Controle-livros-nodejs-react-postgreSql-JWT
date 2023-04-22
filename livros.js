const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");

// Método GET para listar todos os livros com informações de autores e editoras
router.get('/', async (req, res) => {
    try {
        const livros = await dbKnex('livros')
            .join('autores', 'livros.autor_id', '=', 'autores.id')
            .join('editoras', 'livros.editora_id', '=', 'editoras.id')
            .select('livros.*', 'autores.nome as autor', 'editoras.nome as editora')
            .orderBy('livros.id', 'desc');
        res.status(200).json(livros);
    } catch (err) {
        res.status(400).json({ message: error.message });
    }
});

// Método POST para cadastrar um livro
router.post('/', async (req, res) => {
    const { titulo, autor_id, editora_id, ano, preco, foto } = req.body;

    if (!titulo || !autor_id || !editora_id || !ano || !preco || !foto) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
        const novo = await dbKnex('livros').insert({
            titulo,
            autor_id,
            editora_id,
            ano,
            preco,
            foto
        });
        res.status(201).json({ id: novo[0] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Filtro por título ou autor
router.get("/filtro/:palavra", async (req, res) => {
    const { palavra } = req.params;
    try {
        const livros = await dbKnex('livros')
            .join('autores', 'livros.autor_id', '=', 'autores.id')
            .join('editoras', 'livros.editora_id', '=', 'editoras.id')
            .select('livros.*', 'autores.nome as autor', 'editoras.nome as editora')
            .where("livros.titulo", "like", `%${palavra}%`)
            .orWhere("autores.nome", "like", `%${palavra}%`);
        res.status(200).json(livros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//método PUT para atualizar um livro, o id indica o registro a ser alterado
router.put('/:id', async(req, res) => {
    const id = req.params.id; //pega o id enviado pela requisição
    const { preco } = req.body; //campo a ser alterado
    try{
        //altera o campo preco, no registro onde o id coincidir com o id enviado
        await dbKnex('livros').update({preco}).where({id});
        res.status(200).json(); //statusCode indica ok no update
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }

});

//método DELETE para deletar um livro
router.delete('/:id',async(req,res) =>{
    const {id} = req.params; //pega o id enviado pela requisição para ser excluído
    try{
        await dbKnex('livros').del().where({id});
        res.status(200).json(); //statusCode indica ok no delete
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }

});

//filtro por título ou autor
router.get("/filtro/:palavra",async (req,res) => {
    const {palavra} = req.params; //palavra com o título ou autor a ser pesquisado
    try{
        //para filtrar os registros, se utiliza o .where() e suas variações
        const livros = await dbKnex('livros')
        .where("titulo", "like", `%${palavra}%`)
        .orWhere("autor", "like", `%${palavra}%`);
        res.status(200).json(livros); //retorna ok e os dados
    }catch(error){
        res.status(400).json({message: error.message}); // retorna status de erro e mensagens
    }
    }
);

//Resumo do cadastro de Livros
router.get("/dados/resumo", async (req,res) => {
    try{
        //métodos estatísticos para ober dados da tabela
        const consulta = await dbKnex('livros')
        .count({num:"*"})
        .sum({soma: "preco"})
        .max({maior:"preco"})
        .avg({media: "preco"});
        const {num,soma,maior,media} = consulta[0];
        res.status(200).json({num,soma,maior,media}); //retorna ok e os dados
    }catch(error){
        res.status(400).json({message: error.message}); // retorna status de erro e mensagens
    }
});

//Soma dos preços agrupados por ano
router.get("/dados/grafico", async (req,res) => {
    try{
        //obtém o ano e soma o preco dos livros, agrupados por ano
        const totalPorAno = await dbKnex('livros')
        .select("ano")
        .sum({total:"preco"}).groupBy("ano");
        res.status(200).json(totalPorAno); //retorna ok e os dados
    }catch(error){
        res.status(400).json({message: error.message}); // retorna status de erro e mensagens
    }
});

module.exports = router;