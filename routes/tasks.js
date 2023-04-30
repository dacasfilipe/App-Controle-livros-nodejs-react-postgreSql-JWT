module.exports = app => {
    const Tasks = app.models.Tasks;

    app.route("/tasks")
        .all(app.auth.authenticate())
        .get( async(req, res) => {
            try {
                //lógica do GET /tasks
                const {id} = req.user;
                const where = {user_id: id};
                const result = await Tasks.findAll({where});
                res.json(result);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .post( async (req, res) => {
            try {
                //lógica do POST /tasks
                req.body.userId = req.user.id;
                const result = await Tasks.create(req.body);
                res.json(result);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });

    app.route("/tasks/:id")
        .all(app.auth.authenticate())
        .get( async (req, res) => {
            try {
                //lógica do GET /tasks/:id
                const {id} = req.params;
                const where = {id, userId: req.user.id};
                const result = await Tasks.findOne({where});
                if (result){
                    res.json(result);
                }else{
                    res.sendStatus(404);
                }
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .put( async (req, res) => {
            try {
                //lógica do PUT /tasks/:id
                const {id} = req.params;
                const where = {id, userId:req.user.id};
                req.body.userId = req.user.id;
                await Tasks.update(req.body, {where});
                res.sendStatus(204);
             
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        })
        .delete( async(req, res) => {
            try {
                //lógica do DELETE /tasks/:id
                const {id} = req.params;
                const where = {id, userIC:req.user.id};
                await Tasks.destroy({where});
                res.sendStatus(204);
               
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });
}