const getCoachById= `SELECT * FROM Coaches WHERE personnel_id = $1`
const getCoaches= 'SELECT * FROM Coaches'
const addCoach= 'INSERT INTO Coaches(first_name, last_name, date_of_birth, place_of_birth ) VALUES ($1, $2, $3, $4) RETURNING *'
const deleteCoach= `DELETE FROM Coaches WHERE personnel_id = $1`
const updateCoach= 'UPDATE Coaches SET first_name= $1 WHERE personnel_id = $2 RETURNING *'
const checkExists= 'SELECT EXISTS(SELECT 1 FROM coaches WHERE personnel_id = $1)'


module.exports= {
    getCoachById,
    getCoaches,
    addCoach,
    deleteCoach,
    updateCoach,
    checkExists
}