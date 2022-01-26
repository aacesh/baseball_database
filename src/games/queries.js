const addGame= 'INSERT INTO games( home_team, visiting_team, date_of_game, winner, winning_pitcher, loosing_pitcher, save_pitcher) VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING *'
const getGameById= `SELECT * FROM games WHERE id = $1`
const getGames= 'SELECT * FROM games'
const updateGame= 'UPDATE games SET winner = $1 WHERE id = $2 RETURNING *'
const deleteGame= `DELETE FROM games WHERE id = $1`

module.exports= {
    addGame,
    getGameById,
    getGames,
    updateGame,
    deleteGame,
   
}