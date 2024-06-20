const nepalModel = require("../model/UserModel")
const nepaModel = require("../model/UserModel")


//create user 
const createuser = async (req,res)=>{
    try {

        const generateMeterNo = function (){ 
          return  Math.floor(Math.random()*10000000)
        }
        const {customerName, address, subscription, phoneNumber}=req.body
        const date = new Date
        const data ={
        customerName,
        address,
        phoneNumber,
        amountSubscribe:subscription,
        meterNo:generateMeterNo(),
        DOP: date.toLocaleDateString()
    }

        const createdUser = await nepaModel.create(data)
        res.status(201).json({message:"new user created sucessfully", createdUser})
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}

//getone
const getOne = async (req,res)=>{
    try {
        let id = req.params.id
        const getonesubcriber = await nepaModel.findById(id)
        res.status(200).json({message:`kindly find subscriber with ${id}`, getonesubcriber})
        } catch (error) {
    res.status(500).json(error.message)
        
    }
}

monthly usage
const estimateUsage = async(req,res)=>{
    try {
        const {meterNo, monthlyUsage}=req.body
        const owner = await nepaModel.findOne({meterNo})
        if(!owner){
            res.status(400).json({message:"user not detected"})
        }
        let remainingUnit = owner.conversion-monthlyUsage
        const monthlyReading = await nepaModel.findOneAndUpdate({meterNo},{conversion:remainingUnit},{new:true})
        res.status(200).json({message:`user updated successfully`, monthlyReading})

     
    } catch (error) {
        res.status(500).json(error.message)
         
    }
}

//payment
const paybills= async (req,res)=>{
    try {
        const {meterNo, amount}=req.body
        const owner = await nepalModel.findOne({meterNo})

        if(!owner){
            res.status(400).json({message:"meter number does not exist"})
        }
        let calculatedRate =parseFloat((amount/66.7).toFixed(2))
        console.log(calculatedRate);
        const remainingBalance = owner.conversion+calculatedRate

        const amountPaid = await nepaModel.findOneAndUpdate({meterNo},{conversion:remainingBalance},{new:true})
        res.status(200).json({message:"kindy display remaining balance", data:amountPaid.conversion})
    } catch (error) {
        res.status(500).json(error.message)
        
    } 

}
module.exports= {createuser,getOne,estimateUsage,paybills} 