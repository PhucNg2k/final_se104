const mongoose=require("mongoose");

var mongoURL = 'mongodb+srv://Carrot:thinhprohero@atlascluster.oi3m0pm.mongodb.net/'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connections

connection.on('error' , ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose
