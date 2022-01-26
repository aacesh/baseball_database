const { Router }= require("express")
const { getHit, getHits, addHit, deleteHit, updateHit } = require('./controller')

let router= Router()

router.get("/", getHits)
router.post("/", addHit)
router.get("/hit", getHit)
router.put("/", updateHit)
router.delete("/", deleteHit)


module.exports= router