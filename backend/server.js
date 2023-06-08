const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors());
const Book = require('./models/books.models');
const { PORT } = require('./configs/server.config');
const { DB_URL, DB_PROD_URL } = require('./configs/db.config');

let connectionString = DB_PROD_URL;

if(process.env.NODE_ENV !== 'production'){
    connectionString = DB_URL;
}
//middlewares
app.use(bodyParser.json());


//IIFE
(async ()=> {
    try{    
        await mongoose.connect(connectionString);
        console.log('db connected');
        //await init();
    }
    catch(err){
        console.error('error getting while connecting mongoDB', err);
    }

})();

// Inserting default enteries in DB
async function init(){
    try{
        await Book.collection.drop();
        await Book.create({
            title : "FunCinemas" ,
            author: "vishal",
            description : "Top class theatre" ,
            price : 499
        });
        console.log("book inserted sucessfully!!!");
}
catch(err){
    console.log('error while inserting default entries in DB', err);
}
}

// call the routes
require('./routes/books.routes')(app);

//listen port
app.listen(PORT, ()=> {
    console.log(`server is running on port: ${PORT}, please access it on http://localhost:${PORT}`)
})

