const addScore= 'INSERT INTO scores(team_name, game_id, runs, hits, errors) VALUES ($1, $2, $3, $4, $5) RETURNING *'
const getScore= `SELECT * FROM scores WHERE team_name = $1 AND game_id = $2 `
const getScores= 'SELECT * FROM scores'
const updateScore= 'UPDATE scores SET runs = $1 WHERE team_name = $2 AND game_id = $3 RETURNING*'
const deleteScore= `DELETE FROM scores WHERE team_name = $1 AND game_id = $2`

module.exports= {
    addScore,
    getScore,
    getScores,
    updateScore,
    deleteScore,
   
}