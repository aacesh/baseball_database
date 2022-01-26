const { Router }= require("express")
const { getUmpireById, getUmpires, addUmpire, deleteUmpire, updateUmpire } = require('./controller')

let router= Router()

router.get("/", getUmpires)
router.post("/", addUmpire)
router.get("/:id", getUmpireById)
router.put("/:id", updateUmpire)
router.delete("/:id", deleteUmpire)


module.exports= router