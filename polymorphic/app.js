// const express = require('express');
// const app = express();
const db = require('./models/index');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get('/',(req,res)=>{
//     res.json({ message: "Welcome" });
// });

db.sequelize.sync();


// const image = require('./routes/image.route');
// app.use('/data',image);

// app.listen(3001,()=>{
//     console.log("SERVER IS LISTNING");
// })

const express = require('express');

const app = express();

const controller=require('./controllers/controller')
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get("/",(req,res)=>{
    res.json({message: "App is ready"});
})

app.post("/one-to-many",controller.onetomany)

app.post("/one-to-many/video",controller.onetomanyVideo)

app.post("/many-to-many/image",controller.manytomanyImage)

app.post("/many-to-many/video",controller.manytomanyVideo)

app.get("/one-to-many/find-image",controller.findOneImage)

app.get("/one-to-many/find-video",controller.findOneVideo)

app.get("/many-to-many/find-image",controller.findManyImage)

app.get("/many-to-many/find-video",controller.findManyVideo)



app.listen(8081, ()=>{
    console.log("Server is running");
})
