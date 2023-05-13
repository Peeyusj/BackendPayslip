const  mongoose  = require('mongoose');
const  userDetailsScehma=new mongoose.Schema(
    {
        uname:String,
        email: String,
        phoneno:String,
        pwd:String,
        designation:String,  
        ename:String,
        empid: String,
        basicpay:Number,
        HRA:Number,
    },
    {collection:"UserInfo"}
);
mongoose.model("UserInfo",userDetailsScehma)







