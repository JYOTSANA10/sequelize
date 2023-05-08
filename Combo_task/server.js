const express =require('express');
const app=express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
// app.set('view engine', 'ejs');

const db = require('./models/index')
const controller= require('./controller/selectController')


app.get('/select',controller.selectMasterSelect);


app.post('/create',controller.selectMaster);
app.post('/update',controller.selectMasterUpdate);


app.listen(3000, ()=>{
    console.log("Server is running");
})