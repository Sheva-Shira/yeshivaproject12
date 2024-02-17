const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},
workerId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
},
description:{
    type:String
},
recievingDate:{
    type:mongoose.Schema.Types.Date,
    default :()=>new Date()
},
doneDate:{
    type:mongoose.Schema.Types.Date,
    default :null
},
imageUrlMan:{
    type:String,
    maxLength:10
},
imageUrlWor:{
    type:String,
    maxLength:10
},
complete:{
    type:Boolean,
    default:false
},
urgency:{
    type:String,
    enum:["low","medium","high","imediatly"],
    default:"medium"
},

workerComments:{
    type:String
}

},{
    timestamps:true
})

module.exports=mongoose.model('Todo',todoSchema)