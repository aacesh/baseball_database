const getTeamByName= `SELECT * FROM teams WHERE team_name = $1`
const getManagerById= 'SELECT * FROM managers WHERE personnel_id = $1'
const addTeam= 'INSERT INTO teams(team_name, city, division, league, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *'
const updateTeam= 'UPDATE teams SET division= $1 WHERE team_name = $2 RETURNING *'
let deleteTeamFrom_team_coaches= 'DELETE FROM team_coaches WHERE team_name= $1'
let deleteTeamFrom_team_players= 'DELETE FROM team_players WHERE team_name= $1'
const deleteTeam= `DELETE FROM teams WHERE team_name = $1`
// const getCoaches=  'SELECT coach_id FROM team_coaches WHERE team_name = $1'
// const getPlayers=  'SELECT player_id FROM team_players WHERE team_name = $1'
const getTeams= 'SELECT * FROM teams'




const allExists= (array, table_name, checkKey) => {
    let checkExistsQuery= array.reduce((accu, currVal, index) => {
        if (index < array.length -1 ) {
            currVal= `${accu} EXISTS ( SELECT 1 FROM ${table_name} WHERE ${checkKey} = ${currVal} ) AND `
        }
        else{
            currVal= `${accu} EXISTS ( SELECT 1 FROM ${table_name} WHERE ${checkKey} = ${currVal} ))`
        }
        return currVal.toString()
    
    }, "SELECT (")
    return checkExistsQuery
}

const getCoaches= (teams) => {
    let query= teams.reduce((accu, currVal, index) => {
        if (index < teams.length -1 ) {
            currVal= `${accu} team_name = '${currVal}' OR`
        }
        else{
            currVal= `${accu} team_name = '${currVal}'`
        }
        return currVal.toString()
    
    }, "SELECT * FROM team_coaches WHERE")
    return query

}

const getPlayers= (teams) => {
    let query= teams.reduce((accu, currVal, index) => {
        if (index < teams.length -1 ) {
            currVal= `${accu} team_name = '${currVal}' OR`
        }
        else{
            currVal= `${accu} team_name = '${currVal}'`
        }
        return currVal.toString()
    
    }, "SELECT * FROM team_players WHERE")
    return query

}

module.exports= {
    getTeamByName,
    getManagerById,
    allExists,
    addTeam,
    updateTeam,
    deleteTeamFrom_team_coaches,
    deleteTeamFrom_team_players,
    deleteTeam,
    getCoaches,
    getPlayers,
    getTeams,
   
}