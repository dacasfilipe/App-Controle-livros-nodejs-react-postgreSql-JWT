const express = require('express');
const router = express.Router();

const dbKnex = require("../data/db_config");

// Método GET para listar todas as editoras
router.get('/', async (req, res) => {
    try {
        const editoras = await dbKnex('editoras').select('*');
        res.status(200).json(editoras);
    } catch (err) {
        res.status(400).json({ message: error.message });
    }
});

// Método POST para cadastrar uma editora
router.post('/', async (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
        const novo = await dbKnex('editoras').insert({ nome });
        res.status(201).json({ id: novo[0] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Método PUT para atualizar uma editora, o id indica o registro a ser alterado
router.put('/:id', async(req, res) => {
    const id = req.params.id; //pega o id enviado pela requisição
    const { nome } = req.body; //campo a ser alterado
    try{
        //altera o campo nome, no registro onde o id coincidir com o id enviado
        await dbKnex('editoras').update({nome}).where({id});
        res.status(200).json(); //statusCode indica ok no update
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }

});

// Método DELETE para deletar uma editora
router.delete('/:id',async(req,res) =>{
    const {id} = req.params; //pega o id enviado pela requisição para ser excluído
    try{
        await dbKnex('editoras').del().where({id});
        res.status(200).json(); //statusCode indica ok no delete
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }

});

module.exports = router;
