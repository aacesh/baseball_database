const { Router }= require("express")
const { getManagerById, getManagers, addManager, deleteManager, updateManager } = require('./controller')

let router= Router()

router.get("/", getManagers)
router.post("/", addManager)
router.get("/:id", getManagerById)
router.put("/:id", updateManager)
router.delete("/:id", deleteManager)


module.exports= router