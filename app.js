const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');



//Load config
dotenv.config({path: './config/config.env'})

//connecting to mongoDB
connectDB()

const app = express();



if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 9000

app.listen(PORT, ()=>{
    console.log(`Server is listening in ${process.env.NODE_ENV} on port ${PORT}`);

})