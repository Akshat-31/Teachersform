import express from 'express';
// import { connect } from 'http2';
import { connect } from "mongoose";
// import teachersmodal from './teachers-modal.js';
import mongoose from 'mongoose';
import killPort from 'kill-port';
import teachersSchema from './teachers-modal.js';
// import res from 'express/lib/response.js';
// const express=require('express');
// const express =require("express")
const app=express();
const port=process.env.PORT || 5600;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(port,()=>{console.log(`Server started at ${port}`);})
// app.use(express.json());
mongoose.connect("mongodb+srv://akshatsehgal:Akshat@cluster0.vf5givi.mongodb.net/?retryWrites=true&w=majority").then(res=>{console.log("connected")}).catch(res=>{console.log("error")});
// connect();
const teachersmodal=mongoose.model("teachers",teachersSchema);
app.get("/teachers/:id",async (req,res)=>{
    try{
        const user=await teachersmodal.findOne({id:req.params.id});
        if(!user){
            console.log("not found");
             return res.status(404).json({message:"user not found"});;
            
        }else{
            console.log("get request");
            return res.json(user);
        }
    }catch (error ){
        console.log(error.status,">>>")
        return res.status(400).json(error.message)
    }
})

app.post("/teachers/id",async (req,res)=>{
    try{
        console.log(req.body,"post");
        const user=new teachersmodal(req.body);
        await user.save();
        return res.json({message:"Posted"});
    }catch(error){
        res.end("hello");
            return ;
    }
})
app.patch("/teachers/id",async (req,res)=>{
    try{
        const received_data=req.body;
        const user=await teachersmodal.findOne({id:received_data.id});
        console.log(user);
        console.log(received_data);
        if(received_data.name!=undefined){
            user.name=received_data.name;
        }
        if(received_data.department!=undefined){
            user.department=received_data.department;
        }
        if(received_data.address!=undefined){
            user.address=received_data.address;
        }
        if(received_data.street!=undefined){
            user.street=received_data.street;
        }
        if(received_data.city!=undefined){
            user.city=received_data.city;
        }
        if(received_data.state!=undefined){
            user.state=received_data.state;
        }
        if(received_data.pin!=undefined){
            user.pin=received_data.pin;
        }
        await user.save();
        console.log(user);
        return res.json(user);
    }catch(error){
        console.log(error);
        return ;
    }
})
app.delete("/teachers/id",async(req,res)=>{
    const received_user=req.body;
    try{
        await teachersmodal.deleteOne({id:received_user.id});
            console.log("Deleted");
            return res.end("Delete");       
    }catch(error){
        return res.end("failed");
    }
})
// const kill = require("kill-port");
// kill(8000, "tcp");
// app.listen(5600,(err)=>console.log(err,'s'));