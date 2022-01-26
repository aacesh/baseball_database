const { Router }= require("express")
const { getCoachById, getCoaches, addCoach, deleteCoach, updateCoach } = require('./controller')

let router= Router()

router.get("/", getCoaches)
router.post("/", addCoach)
router.get("/:id", getCoachById)
router.put("/:id", updateCoach)
router.delete("/:id", deleteCoach)

module.exports= router