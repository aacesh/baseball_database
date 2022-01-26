const addManager= 'INSERT INTO managers(first_name, last_name, date_of_birth, place_of_birth ) VALUES ($1, $2, $3, $4) RETURNING *'
const getManagerById= `SELECT * FROM managers WHERE personnel_id = $1`
const getManagers= 'SELECT * FROM managers'
const updateManager= 'UPDATE managers SET first_name= $1 WHERE personnel_id = $2 RETURNING *'
const deleteManager= `DELETE FROM managers WHERE personnel_id = $1`

module.exports= {
    addManager,
    getManagerById,
    getManagers,
    updateManager,
    deleteManager,
   
}