const getPlayerById= `SELECT * FROM players WHERE personnel_id = $1`
const getPlayers= 'SELECT * FROM players'
const addPlayer= 'INSERT INTO players(first_name, last_name, date_of_birth, place_of_birth, batting_orientation, batting_average) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
const deletePlayer= `DELETE FROM players WHERE personnel_id = $1`
const updatePlayer= 'UPDATE players SET first_name= $1 WHERE personnel_id = $2 RETURNING *'


module.exports= {
    getPlayerById,
    getPlayers,
    addPlayer,
    deletePlayer,
    updatePlayer
}