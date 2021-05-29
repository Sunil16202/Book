require('dotenv').config('./config.env')

const mongooose = require('mongoose');

const connectDB = async () => {
    //console.log('Mongo is listening..')
    try{
        const conn = await mongooose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err){
        
        console.log(err);
        process.exit(1)

    }
}

module.exports = connectDB;