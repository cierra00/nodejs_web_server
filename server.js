const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require( './config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3000;

//connect to Mongo DB

connectDB();

// custom middleware logger
app.use(logger);

// cross-origin resource sharing
app.use(cors(corsOptions));

//middleware handling urlencoded data "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({extended: false}));

//json middleware
app.use(express.json());

// middleware serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/*', require('./routes/api/states'));


app.all('*', (req, res) => {
   res.status(404);
   if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views' ,'404.html')) 
   }
    else if(req.accepts('json')) {
    res.json({error: "404 Page Not Found"})
   } else {
    res.type('txt').send("404 Not Found either");
   }
});

//Error handling
app.use(errorHandler);

mongoose.connection.once('open', ()=>{
   console.log('Connected to Mongo DB');
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
