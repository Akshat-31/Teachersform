import mongoose from "mongoose";

const teachersSchema=mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String},
    department:{type:String},
    address:{type:String},
    street:{type:String},
    city:{type:String},
    state:{type:String},
    pin:{type:String}
});
export default teachersSchema