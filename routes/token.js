const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config.js');

module.exports = (app) => {
    const Users = app.models.users;
    const { secret } = config.jwt;    
    /*
     * Lógica da rota de autenticação de usuários
     * A rota recebe um email e uma senha no corpo da requisição
     * A rota busca o usuário no banco de dados pelo email
     * A rota compara a senha enviada com a senha armazenada no banco de dados
     * Se a senha for válida, a rota retorna um token JWT
     * Se a senha for inválida, a rota retorna um erro 401
     * Se o email não existir, a rota retorna um erro 401
     * Se houver algum erro na requisição, a rota retorna um erro 401
     * A rota retorna um token JWT com o id do usuário
     * O token JWT é assinado com o segredo da aplicação
     * O token JWT expira em 1 dia
     * O token JWT é retornado no corpo da resposta
     */
    app.post('/token', async (req, res) => {
        try{
            const { email, password } = req.body;
            if(email && password){
                const where = {email};
                const user = await Users.findOne({where});
                if(bcrypt.compareSync(password, user.password)){
                    const payload = {id: user.id};
                    const token = jwt.encode(payload, secret);
                    return res.json({token});
                }
             }
             return res.sendStatus(401);
            }catch(error){
                return res.sendStatus(401);
            }
    });
}