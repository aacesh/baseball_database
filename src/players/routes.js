const { Router }= require("express")
const { getPlayerById, getPlayers, addPlayer, deletePlayer, updatePlayer } = require('./controller')

let router= Router()

router.get("/", getPlayers)
router.post("/", addPlayer)
router.get("/:id", getPlayerById)
router.put("/:id", updatePlayer)
router.delete("/:id", deletePlayer)


module.exports= router