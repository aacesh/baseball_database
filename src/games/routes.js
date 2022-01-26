const { Router }= require("express")
const { getGameById, getGames, addGame, deleteGame, updateGame } = require('./controller')

let router= Router()

router.get("/", getGames)
router.post("/", addGame)
router.get("/:id", getGameById)
router.put("/:id", updateGame)
router.delete("/:id", deleteGame)


module.exports= router