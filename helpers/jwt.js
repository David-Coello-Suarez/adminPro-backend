const jwt = require("jsonwebtoken");

const generarToken = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            uid,
            secret: "DfC$1309@"
        }
        
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h',
        }, (error, token) => {
            if(error){
                console.error(error);
                reject('No se pudo generar el token');
            }else{
                resolve( token )
            }
        } )

    } );
}

module.exports = {
    generarToken
}