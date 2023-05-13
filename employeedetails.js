const  mongoose  = require('mongoose');
const mongourl="mongodb+srv://piyushrairai124:piyush@cluster0.gbbrsre.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongourl,{
    useNewUrlParser:true
}).then(()=>{
    console.log("connected");
}).catch((e)=>{console.log(e);})


const  empDetailsScehma = new mongoose.Schema(
    { 
        ename:String,
        empid: String,
        basicpay:Number,
        HRA:Number,
    }
);

const empData = mongoose.model("empInfo",empDetailsScehma)

module.exports = empData







