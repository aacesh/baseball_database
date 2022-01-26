const { Router }= require("express")
const { getScore, getScores, addScore, deleteScore, updateScore } = require('./controller')

let router= Router()

router.get("/", getScores)
router.post("/", addScore)
router.get("/single-score", getScore)
router.put("/", updateScore)
router.delete("/", deleteScore)


module.exports= router