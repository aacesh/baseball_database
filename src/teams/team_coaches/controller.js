const pool = require('../../../db')
const queries = require("./queries")

const addCoachesInTeam = async(team_name, coaches) => {
    try {
        let query= queries.addteamCoaches(team_name, coaches).toString()
        console.log("query inside add coaches in team>>>>", query)
        let results = await pool.query(query)
        console.log("result inside add coaches in team", results.rows)
        return results.rows
    } catch (error) {
        console.log(error.message)
    }
}




module.exports = {
    addCoachesInTeam
}