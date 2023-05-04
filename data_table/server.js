const express =require('express');
const app=express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const db = require('./models/index')
const controller= require('./controller')


app.get('/',function(req,res){
    console.log("app is running");
   res.render('index',{ title : 'Index'});
})

app.get('/get_data',controller.data_table);

app.listen(3000, ()=>{
    console.log("Server is running");
})