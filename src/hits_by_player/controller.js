const pool = require('../../db')
const queries = require("./queries")

const addHit = async (req, res) => {
    const { singles, doubles, triples, home_runs, player_id, game_id} = req.body.hit
    try {
        let results = await pool.query(queries.addHit, [ singles, doubles, triples, home_runs, player_id, game_id ])
        let hit = results.rows[0]
        let data = {
            success: true,
            message: 'Hit created successfully',
            data: { hit }
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


const updateHit = async (req, res) => {
    let player_id = req.query.player_id
    let game_id = req.query.game_id
    let { singles } = req.body.hit
    try {
        let results = await pool.query(queries.getHit, [player_id, game_id])
        if (results.rowCount < 1) {
            throw new Error(`Hit  does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updateHit, [singles, player_id, game_id])
        let updatedHit= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Hit updated successfully`,
            updatedHit,
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

const deleteHit = async (req, res) => {
    let player_id = req.query.player_id
    let game_id = req.query.game_id
    try {
        let results = await pool.query(queries.getHit, [player_id, game_id])
        if (results.rowCount < 1) {
            throw new Error(`Hit does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deleteHit, [player_id, game_id])
        let data = {
            success: true,
            message: `Hit deleted successfully`
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




const getHit = async (req, res) => {
    let player_id = req.query.player_id
    let game_id = req.query.game_id
    try {
        let results = await pool.query(queries.getHit, [player_id, game_id])
        let hit = results.rows[0]
        let data = {
            success: true,
            data: { hit }
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


const getHits = async (req, res) => {
    try {
        let results = await pool.query(queries.getHits)
        let hits = results.rows
        let data = {
            success: true,
            data: { hits }
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
    getHit,
    getHits,
    addHit,
    deleteHit,
    updateHit
}