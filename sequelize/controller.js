const db=require('./db')
const  Customer = db.customers;

function createCustomer(req,res){

    const customerObject={
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    }

    Customer.create(customerObject).then(data=>{
        res.send(data)
    }).catch(error=>{
        res.status(500).send(error);
    })
}

function allCustomer(req,res){
    Customer.findAll().then(data=>{
        res.send(data)
    }).catch(error=>{
        res.status(500).send(error);

    })
}

function updateCustomer(req,res){

    console.log(req.params.id);

    const customerObject={
        
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    }

    Customer.update(customerObject,{
        where:{id:req.params.id}
    }).then(data=>{
        res.send(data)
    }).catch(error=>{
        res.status(500).send(error);
    })
}

function deleteCustomer(req,res){
    Customer.destroy({
        where:{id:req.body.id}
    }).then(data=>{
        res.send(data)
    }).catch(error=>{
        res.status(500).send(error);
    })
}

module.exports={
    createCustomer,
    allCustomer,
    updateCustomer,
    deleteCustomer
};