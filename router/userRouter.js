const {createuser,getOne,estimateUsage,paybills} = require ("../controller/userController.js")
const router = require ("express").Router()


router.post("/createuser", createuser)
router.get("/getone/:id", getOne)
router.put("/updateusage", estimateUsage)
router.put("/paybills", paybills)

module.exports=router 