const jwt = require("jsonwebtoken");
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const SECRET_REFRESH_KEY = process.env.SECRET_REFRESH_KEY;

const refreshTokens = []

function authenticate(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            return res.sendStatus(401);
        }
        jwt.verify(token, SECRET_ACCESS_KEY, (err, user)=>{
            if(err){
                return res.sendStatus(403);
            }
            next();
        });
    } catch (error) {
        res.status(400).json({message: "access denied"});
    }
}
function generateAccessToken(data){
    return jwt.sign(data, SECRET_ACCESS_KEY, {expiresIn: '25s'})
}
function generateRefreshToken(data){
    const refreshToken =  jwt.sign(data, SECRET_REFRESH_KEY)
    refreshTokens.push(refreshToken);
    return refreshToken
}
function tokenRefresh(data, res){
    const refreshToken = data.token;
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(401);
    else{
        const accessToken = generateAccessToken({username: data.username, password: data.password});
        return res.status(200).json({'token': accessToken, 'refreshToken': refreshToken})
    }
}
module.exports = {
    authenticate,
    generateAccessToken,
    generateRefreshToken,
    tokenRefresh
}