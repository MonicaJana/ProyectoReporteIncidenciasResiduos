import  jwt  from "jsonwebtoken";
const createToken = (userInfo)=>{
    //          1                                 2           3
    return jwt.sign(userInfo, 'secret_key',{expiresIn:'1h'})
}
const verifyToken = (req,res,next) => {
    //req.body rq.params req.query req.headers
    const authHeader = req.headers.authorization
    //validar si se esta enviando el token
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Token no proporcionado.'})
    }
    //Divvidir el token "Bearer 3534534534533535"
    // token = ["Bearer" , "3534534534533535"]
    const token = authHeader.split(' ')[1]
    jwt.verify(token, 'secret_key', (err,decoded) => {
        //verificacion
        if (err){
            return res.status(403).json({message: 'Fallo al autenticar al token.'})
        }
        //usuario decodificado
        req.user = decoded
        next()
    })
}
export {
    createToken,
    verifyToken
}