const pool = require('../../db')
const queries = require("./queries")

const addScore = async (req, res) => {
    const {team_name, game_id, runs, hits, errors } = req.body.score
    try {
        let results = await pool.query(queries.addScore, [ team_name, game_id, runs, hits, errors ])
        let score = results.rows[0]
        let data = {
            success: true,
            message: 'Score created successfully',
            data: { score }
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


const updateScore = async (req, res) => {
    let team_name = req.query.team_name
    let game_id = req.query.game_id
    let { runs } = req.body.score
    try {
        let results = await pool.query(queries.getScore, [team_name, game_id])
        if (results.rowCount < 1) {
            throw new Error(`Score  does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updateScore, [runs, team_name, game_id])
        let updatedScore= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Score updated successfully`,
            updatedScore,
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

const deleteScore = async (req, res) => {
    let team_name = req.query.team_name
    let game_id = req.query.game_id
    try {
        let results = await pool.query(queries.getScore, [team_name, game_id])
        if (results.rowCount < 1) {
            throw new Error(`Score does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deleteScore, [team_name, game_id])
        let data = {
            success: true,
            message: `Score deleted successfully`
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




const getScore = async (req, res) => {
    let team_name = req.query.team_name
    let game_id = req.query.game_id
    try {
        let results = await pool.query(queries.getScore, [team_name, game_id])
        let score = results.rows[0]
        let data = {
            success: true,
            data: { score }
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


const getScores = async (req, res) => {
    try {
        let results = await pool.query(queries.getScores)
        let scores = results.rows
        let data = {
            success: true,
            data: { scores }
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
    getScore,
    getScores,
    addScore,
    deleteScore,
    updateScore
}