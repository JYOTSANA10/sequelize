const express =require('express');
const app=express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());

const db = require('./models/index')
const controller= require('./controller')




app.get('/',()=>{
    console.log("App is Running");
})

// app.get('/customer',function(req,res){
//    controller.createCustomer(req,res);
    
// })

 app.get('/customer',controller.allCustomer);

app.get('/search',controller.searchCustomer);

app.get('/sort',controller.sortCustomer);

app.get('/onetoone',controller.oneToOne);
app.get('/manytomany',controller.manyToMany);



app.post('/onetoone-create',controller.oneToOneCreate);
app.post('/onetomany-create',controller.oneToManyCreate);


app.post('/manytomany-create',controller.manyToManyCreate);

app.put('/onetomany-update',controller.oneToManyUpdate);






app.get('/paranoid',controller.paranoid);


// app.delete('/delete/:id',controller.deleteCustomer);



app.listen(8081, ()=>{
    console.log("Server is running");
})