
const express=require('express');
const connect=require('./configs/db.js')

//const {signup,signin}=require('./controllers/auth.controller.js')
const usercontroller=require('./controllers/user.controller.js')
const postcontroller=require('./controllers/post.controller.js');
const signup=require('./controllers/signupvalidation.controller.js');
const signin=require('./controllers/signinvalidation.js')
const app= express();

app.use(express.json());

//app.use("/posts",postcontroller)
 app.use("/signup",signup);
 app.use("/signin",signin)
 app.use("/users",usercontroller)
//app.post("/signup",signup);
//app.post("/signin",signin)

app.use("/posts",postcontroller)


    
console.log("hello")
    app.listen(1300, async ()=>{
        await connect()
        console.log('listening on port 1300');
    })



