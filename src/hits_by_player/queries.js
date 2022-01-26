const addHit= 'INSERT INTO hits_by_player(singles, doubles, triples, home_runs, player_id, game_id) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *'
const getHit= `SELECT * FROM hits_by_player WHERE player_id = $1 AND game_id = $2 `
const getHits= 'SELECT * FROM hits_by_player'
const updateHit= 'UPDATE hits_by_player SET singles = $1 WHERE player_id = $2 AND game_id = $3 RETURNING*'
const deleteHit= `DELETE FROM hits_by_player WHERE player_id = $1 AND game_id = $2`

module.exports= {
    addHit,
    getHit,
    getHits,
    updateHit,
    deleteHit,
   
}