
/*
    Com o JWT é possível implementar um mecanismo de autenticação
    segura, que evita o tráfego frequente de senhas entre cliente e
    servidor.
*/
module.exports = app => {
    const Users = app.models.Users;
    app.route("/user")
        .all(app.auth.authenticate())
        .get(async (req, res) => {
            try {
                const {id} = req.user;
                const attributes = ["id","name","email"];
                const options = { attributes};
                const result = await Users.findByPk(id, options);
                if (result){
                    res.json(result);
                }else{
                    res.sendStatus(404);
                }
            } catch (error) {
                res.sendStatus(412).json({msg: error.message});
            }
            })
            .delete(async (req, res) => {
                try {
                    const {id} = req.user;
                    const where = {id};
                    await Users.destroy({where});
                    if (result){
                        res.sendStatus(204);
                    }else{
                        res.sendStatus(404);
                    }
                } catch (error) {
                    res.sendStatus(412).json({msg: error.message});
                }
            })

            //essa rota não precisa de autenticação
            //é uma rota de cadastro de usuário
            app.post('/users', async (req, res) => {
                try {
                    const result = await Users.create(req.body);
                    res.json(result);
                } catch (error) {
                    res.status(412).json({msg: error.message});
                }
            });
            /*
             Com o JWT é possível implementar um mecanismo de autenticação
             segura, que evita o tráfego frequente de senhas entre cliente e
             servidor.
            */
};