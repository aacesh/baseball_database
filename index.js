const express= require('express')
const playerRoutes= require("./src/players/routes")
const coachRoutes= require("./src/coaches/routes")
const managerRoutes= require("./src/managers/routes")
const umpireRoutes= require("./src/umpires/routes")
const teamRoutes= require("./src/teams/routes")
const gameRoutes= require("./src/games/routes")
const scoreRoutes= require("./src/scores/routes")
const hitRoutes= require("./src/hits_by_player/routes")

const app= express()
const port= 3000

app.use(express.json())
app.use("/api/v1/players", playerRoutes)
app.use("/api/v1/coaches", coachRoutes)
app.use("/api/v1/managers", managerRoutes)
app.use("/api/v1/umpires", umpireRoutes)
app.use("/api/v1/teams", teamRoutes)
app.use("/api/v1/games", gameRoutes)
app.use("/api/v1/scores", scoreRoutes)
app.use("/api/v1/hits", hitRoutes)


app.listen( port, () => console.log(`app listening to port ${port}`))
