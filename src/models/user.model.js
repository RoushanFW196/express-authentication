
const mongoose =require('mongoose');

const bcrypt= require('bcryptjs')


const userSchema= new mongoose.Schema({

    name:{type:"string",required:"true"},
    email:{type:"string",required:"true",unique:"true"},
    password:{type:"string",required:"true"}
},{
    timestamps: true, 
    versionKey:false
})



userSchema.pre("save", function(next){

    if(!this.isModified("password")) return next();

    bcrypt.hash(this.password,8,(err,hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
})



 userSchema.methods.checkPassword= function (password) {
     const passwordhash=this.password;
     return new Promise((resolve, reject)=>{

         bcrypt.compare(password,passwordhash,(err,same)=>{
             if(err) return reject(err);
             resolve(same);
         })
     })
 }


//  userSchema.methods.checkPassword=function (password){
//     return new Promise((resolve,reject)=>{
//         bcrypt.compare(password,this.password,function(err,same){
//             if(err) return reject(err)
            
//             return resolve(same)
//         })
//     })
// }






module.exports = mongoose.model('user',userSchema)