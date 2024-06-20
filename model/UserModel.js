const mongoose = require ("mongoose") 


const nepalSchema = new mongoose.Schema({
    customerName:{type:String, require : [true, "kindly enter your name"]},
    address:{type:String, require : [true,' kindly enter your address']},
    meterNo:{type:Number},
    DOP:{type:Date},
    amountSubscribe:{type:Number, require:[true,"kindly enter your amount of payment"]},
    phoneNumber: {type:String, require: true, unique: [true, "kindly enter your phone number"]},
    outstanding:{type:Number, default:"0"},
    conversion:{type:Number, default: function(){
        return (this.amountSubscribe/66.7 )}} 
},{timestamps:true})

const nepalModel = mongoose.model("electric model", nepalSchema)

module.exports = nepalModel