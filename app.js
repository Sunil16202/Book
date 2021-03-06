const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');



//Load config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

//connecting to mongoDB
connectDB()

const app = express();



if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,   
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 9000

app.listen(PORT, ()=>{
    console.log(`Server is listening in ${process.env.NODE_ENV} on port ${PORT}`);

})