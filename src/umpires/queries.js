const addUmpire= 'INSERT INTO umpires(first_name, last_name, date_of_birth, place_of_birth ) VALUES ($1, $2, $3, $4) RETURNING *'
const getUmpireById= `SELECT * FROM umpires WHERE personnel_id = $1`
const getUmpires= 'SELECT * FROM umpires'
const updateUmpire= 'UPDATE umpires SET first_name= $1 WHERE personnel_id = $2 RETURNING *'
const deleteUmpire= `DELETE FROM umpires WHERE personnel_id = $1`

module.exports= {
    addUmpire,
    getUmpireById,
    getUmpires,
    updateUmpire,
    deleteUmpire,
   
}