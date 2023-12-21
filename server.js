const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Schema Creation
const schemaData = mongoose.Schema({
    name:String,
    qualification:String,
    Year_of_Passout:String
},{
    timestamps:true
})

// Create userModel
const userModel = mongoose.model('user',schemaData);

// API Code Starts

// Get Method
app.get('/',async(req,res)=>{
    const data = await userModel.find({})
    res.json({success:true,data:data})
})

// Post Method
app.post('/create',async(req,res)=>{
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true,message:'Your Data was Successfully Added',data:data})
})

// Put Method
app.put('/update',async(req,res)=>{
    const {_id,...rest}=req.body
    const data = await userModel.updateOne({_id:_id},rest)
    res.send({success:true,message:'Your Data was Successfully Updated',data:data})
})

// Detele Method
app.delete('/delete/:id',async(req,res)=>{
    const _id = req.params.id;
    const data = await userModel.deleteOne({_id:_id})
    res.send({success:true,message:'Your Data was Successfully Deleted'})
})

// Mongo DB connection
mailto:mongoose.connect("mongodb+srv://sanjheyhariramcse1923:sanjheyhariram@curd-api.deydkea.mongodb.net/")
.then(()=>{
    console.log("Database Connected Successfully")
    
}).catch((err)=>{console.log(err)})

// App listen on the PORT
app.listen(2112,()=>{
    console.log("Server Started")
})