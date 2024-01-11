const jwt = require("jsonwebtoken");
const env = require("../Bin/Env");

const authUser = (req, res, next) => {
    try{
        if(req.headers.authorization){
            let tokenDecoded = jwt.verify(req.headers.authorization, env.jwt.secret)
            console.log(req.headers.authorization);
            if(tokenDecoded){
                req.headers.authorization = tokenDecoded;
                console.log(tokenDecoded);
                next();
            }else{
                res.status(403).send({
                    message : "Es un token invalido"
                });
            }
        }else{
            res.status(403).send({
                message : "Para realizar esta accion se necesita token"
            });
        }
    }catch(e){
        res.status(500).send({
            message : "Hubo un error inesperado al procesar el token"
        });
    }
}



module.exports = authUser;