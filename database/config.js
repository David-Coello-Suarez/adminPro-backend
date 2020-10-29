const mongoose = require('mongoose');

const dbconecction = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log('DB Online')
    }catch(error){
        console.log(error);
        throw new Error('Error en la conección revisar logs');
    }
}

module.exports = { 
    dbconecction
}