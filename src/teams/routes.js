const { Router }= require("express")
const { getTeamByName, getTeams, addTeam, deleteTeam, updateTeam } = require('./controller')

let router= Router()

router.get("/", getTeams)
router.post("/", addTeam)
router.get("/:id", getTeamByName)
router.put("/:id", updateTeam)
router.delete("/:id", deleteTeam)


module.exports= router