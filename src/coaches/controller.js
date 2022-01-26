const pool = require('../../db')
const queries = require("./queries")

const addCoach = async (req, res) => {
    const { first_name, last_name, date_of_birth, place_of_birth} = req.body.coach
    try {
        let results = await pool.query(queries.addCoach, [first_name, last_name, date_of_birth, place_of_birth ])
        let coach = results.rows[0]
        let data = {
            success: true,
            message: 'Coach created successfully',
            data: { coach }
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


const deleteCoach = async (req, res) => {
    let coachId = req.params.id
    try {
        let results = await pool.query(queries.getCoachById, [coachId])
        if (results.rowCount < 1) {
            throw new Error(`Coach with personnel_id ${coachId} does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deleteCoach, [coachId])
        let data = {
            success: true,
            message: `Coach with personnel_id ${coachId} deleted successfully`
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


const updateCoach = async (req, res) => {
    let coachId = req.params.id
    let { first_name } = req.body.coach
    try {
        let results = await pool.query(queries.getCoachById, [coachId])
        if (results.rowCount < 1) {
            throw new Error(`Coach with personnel_id ${coachId} does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updateCoach, [first_name, coachId])
        let updatedCoach= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Coach with personnel_id ${coachId} updated successfully`,
            updatedCoach,
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

const getCoachById = async (req, res) => {
    let coachId = req.params.id
    try {
        let results = await pool.query(queries.getCoachById, [coachId])
        let coach = results.rows[0]
        let data = {
            success: true,
            data: { coach }
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


const getCoaches = async (req, res) => {
    try {
        let results = await pool.query(queries.getCoaches)
        let coaches = results.rows
        let data = {
            success: true,
            data: { coaches }
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
    getCoachById,
    getCoaches,
    addCoach,
    deleteCoach,
    updateCoach,
}