const express =require('express');
const app=express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());

const db = require('./db')
const controller= require('./controller')




app.get('/',()=>{
    console.log("App is Running");
})

app.post('/create',function(req,res){
   controller.createCustomer(req,res);
    
})

app.get('/customer',controller.allCustomer);

app.put('/update',controller.updateCustomer);

app.delete('/delete/:id',controller.deleteCustomer);



app.listen(8081, ()=>{
    console.log("Server is running");
})