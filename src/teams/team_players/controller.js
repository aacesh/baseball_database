const pool = require('../../../db')
const queries = require("./queries")

const addPlayersInTeam = async(team_name, players) => {
    try {
        let query= queries.addteamPlayers(team_name, players)
        console.log("query >>>>", query)
        let results = await pool.query(query)
        console.log("result inside add players in team >>>>>>>>>", results.rows)
        return results.rows
    } catch (error) {
        console.log(error.message)
    }
}



module.exports = {
    addPlayersInTeam
}