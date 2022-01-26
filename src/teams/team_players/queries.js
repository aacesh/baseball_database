const addteamPlayers = (team_name, players) => {
    let query= players.reduce((accu, currVal, index) => {
        if (index < players.length -1 ) {
            currVal= `${accu} ('${team_name}', ${currVal}),`
        }
        else{
            currVal= `${accu} ('${team_name}', ${currVal}) ON CONFLICT ON CONSTRAINT team_players_pkey DO NOTHING RETURNING *`
        }
        return currVal.toString()
    
    }, "INSERT INTO team_players (team_name, player_id) VALUES")
    return query
}

module.exports = {
    addteamPlayers

}