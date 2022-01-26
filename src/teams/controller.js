const pool = require('../../db')
const queries = require("./queries")
const { addCoachesInTeam,  }= require("./team_coaches/controller")
const { addPlayersInTeam }= require("./team_players/controller")
const addTeam = async (req, res) => {
    console.log(req.body)
    const { team_name, city, division, league, manager_id, coaches, players} = req.body.team
    try {
        let results

        // Check team already exists
        results = await pool.query(queries.getTeamByName, [team_name])
        if (results.rowCount > 0) {
            throw new Error(`Team with name ${team_name} already exist in database, could not add team`)
        }

        // Check manager exists or not
        results = await pool.query(queries.getManagerById, [manager_id])
        if (results.rowCount < 1) {
            throw new Error(`Manager with personnel_id ${manager_id} does not exist in database, could not add team`)
        }

        // Check all coaches exists or not
        let coachesExistsQuery= queries.allExists(coaches, "coaches", "personnel_id")
        console.log("coaches exists query >>>>", coachesExistsQuery)

        results = await pool.query(coachesExistsQuery)
        if(!Object.values(results.rows[0])[0]){
            throw new Error(`All the coaches does not exist in database, could not add team`)
        }

        // Check all players exists or not
        let playersExistsQuery= queries.allExists(players, "players", "personnel_id")
        console.log("players exists query >>>>", playersExistsQuery)

        results = await pool.query(playersExistsQuery)
        if(!Object.values(results.rows[0])[0]){
            throw new Error(`All the players does not exist in database, could not add team`)
        }


        // Inserting data in team table
        results = await pool.query(queries.addTeam, [team_name, city, division, league, manager_id])
        let team = results.rows[0]

        // Insert coaches in team_coaches table
        let team_coaches= await addCoachesInTeam(team_name, coaches)
        
        //  Insert players in team_players table
        let team_players= await addPlayersInTeam(team_name, players)
     
        let data = {
            success: true,
            message: 'Team created successfully',
            data: { team, team_coaches, team_players }
        }
   
        res.status(201).json(data)
    } catch (error) {
        let data = {
            success: false,
            message: error.message
        }
        res.status(404).json(data)
    }
}


const updateTeam = async (req, res) => {
    let team_name = req.params.id
    let { division } = req.body.team
    try {
        let results = await pool.query(queries.getTeamByName, [team_name])
        if (results.rowCount < 1) {
            throw new Error(`Team ${team_name} does not exist in database, could not be updated`)
        }
       
        let updatedResults= await pool.query(queries.updateTeam, [division, team_name])
        let updatedTeam= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Team ${team_name} updated successfully`,
            updatedTeam,
        }
        res.status(200).json(data)
    } catch (error) {
        let data = {
            success: false,
            message: error.message
        }
        res.status(404).json(data)
    }
}

const deleteTeam = async (req, res) => {
    let team_name = req.params.id
    try {
        let results = await pool.query(queries.getTeamByName, [team_name])
        if (results.rowCount < 1) {
            throw new Error(`Team ${team_name} does not exist in database, could not be deleted`)
        }
       
        await pool.query(queries.deleteTeamFrom_team_coaches, [team_name])
        await pool.query(queries.deleteTeamFrom_team_players, [team_name])
        await pool.query(queries.deleteTeam, [team_name])
        let data = {
            success: true,
            message: `Team ${team_name} deleted successfully`,
        }
        res.status(200).json(data)
    } catch (error) {
        let data = {
            success: false,
            message: error.message
        }
        res.status(404).json(data)
    }
}




const getTeamByName = async (req, res) => {
    let team_name = req.params.id
    let teams= [team_name]
    try {
        let teamResults = await pool.query(queries.getTeamByName, [team_name])
        if (teamResults.rowCount < 1) {
            throw new Error(`Team ${team_name} does not exist in database`)
        }
        let coachResults= await pool.query(queries.getCoaches(teams))
        let playerResults= await pool.query(queries.getPlayers(teams))
        let team = teamResults.rows[0]
        team.coaches = coachResults.rows.map((data) => data.coach_id)
        team.players = playerResults.rows.map((data) => data.player_id)
        let data = {
            success: true,
            data: {team }
        }
        res.status(200).json(data)
    } catch (error) {
        let data = {
            success: false,
            message: error.message
        }
        res.status(404).json(data)
    }
}


const getTeams = async (req, res) => {
    try {
        let results = await pool.query(queries.getTeams)
        let teams = results.rows
        let team_names= teams.map((team) => team.team_name)
        let coachResults= await pool.query(queries.getCoaches(team_names))
        let coaches= coachResults.rows
        let playerResults= await pool.query(queries.getPlayers(team_names))
        let players= playerResults.rows
        teams= teams.map((team) => {
            let team_name= team.team_name
            team.coaches_IDs= coaches.filter( coach => coach.team_name === team_name ).map( coach => coach.coach_id)
            team.players_IDs= players.filter( player => player.team_name === team_name ).map( player => player.player_id)
            return team
        })
  
        let data = {
            success: true,
            data: { teams }
        }
        res.status(200).json(data)
    } catch (error) {
        let data = {
            success: false,
            message: error.message
        }
        res.status(404).json(data)
    }
}


module.exports = {
    getTeamByName,
    getTeams,
    addTeam,
    deleteTeam,
    updateTeam
}