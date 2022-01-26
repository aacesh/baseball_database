const pool = require('../../db')
const queries = require("./queries")

const addPlayer = async (req, res) => {
    const { first_name, last_name, date_of_birth, place_of_birth, batting_orientation, batting_average } = req.body.player
    try {
        let results = await pool.query(queries.addPlayer, [first_name, last_name, date_of_birth, place_of_birth, batting_orientation, batting_average ])
        let player = results.rows[0]
        let data = {
            success: true,
            message: 'Player created successfully',
            data: { player }
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


const deletePlayer = async (req, res) => {
    let playerId = req.params.id
    try {
        let results = await pool.query(queries.getPlayerById, [playerId])
        if (results.rowCount < 1) {
            throw new Error(`Player with personnel_id ${playerId} does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deletePlayer, [playerId])
        let data = {
            success: true,
            message: `Player with personnel_id ${playerId} deleted successfully`
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


const updatePlayer = async (req, res) => {
    let playerId = req.params.id
    let { first_name } = req.body.player
    try {
        let results = await pool.query(queries.getPlayerById, [playerId])
        if (results.rowCount < 1) {
            throw new Error(`Player with personnel_id ${playerId} does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updatePlayer, [first_name, playerId])
        let updatedPlayer= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Player with personnel_id ${playerId} updated successfully`,
            updatedPlayer,
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

const getPlayerById = async (req, res) => {
    let playerId = req.params.id
    try {
        let results = await pool.query(queries.getPlayerById, [playerId])
        let player = results.rows[0]
        let data = {
            success: true,
            data: { player }
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


const getPlayers = async (req, res) => {
    try {
        let results = await pool.query(queries.getPlayers)
        let players = results.rows
        let data = {
            success: true,
            data: { players }
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
    getPlayerById,
    getPlayers,
    addPlayer,
    deletePlayer,
    updatePlayer
}