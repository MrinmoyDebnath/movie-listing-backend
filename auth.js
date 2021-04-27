
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");


module.exports = function(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(authHeader)
        if(!token){
            return res.sendStatus(401);
        }
        jwt.verify(token, SECRET_KEY, (err, user)=>{
            if(err){
                return res.sendStatus(403);
            }
            console.log("user: ",user);
            next();
        });
    } catch (error) {
        console.error(error)
        res.status(400).json({message: "access denied"});
    }
}