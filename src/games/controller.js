const pool = require('../../db')
const queries = require("./queries")

const addGame = async (req, res) => {
    const { home_team, visiting_team, date_of_game, winner, winning_pitcher, loosing_pitcher, save_pitcher } = req.body.game
    try {
        let results = await pool.query(queries.addGame, [ home_team, visiting_team, date_of_game, winner, winning_pitcher, loosing_pitcher, save_pitcher ])
        let game = results.rows[0]
        let data = {
            success: true,
            message: 'Game created successfully',
            data: { game }
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


const updateGame = async (req, res) => {
    let gameId = req.params.id
    let { winner } = req.body.game
    try {
        let results = await pool.query(queries.getGameById, [gameId])
        if (results.rowCount < 1) {
            throw new Error(`Game with id ${gameId} does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updateGame, [winner, gameId])
        let updatedGame= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Game with id ${gameId} updated successfully`,
            updatedGame,
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

const deleteGame = async (req, res) => {
    let gameId = req.params.id
    try {
        let results = await pool.query(queries.getGameById, [gameId])
        if (results.rowCount < 1) {
            throw new Error(`Game with id ${gameId} does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deleteGame, [gameId])
        let data = {
            success: true,
            message: `Game with id ${gameId} deleted successfully`
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




const getGameById = async (req, res) => {
    let gameId = req.params.id
    try {
        let results = await pool.query(queries.getGameById, [gameId])
        let game = results.rows[0]
        let data = {
            success: true,
            data: { game }
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


const getGames = async (req, res) => {
    try {
        let results = await pool.query(queries.getGames)
        let games = results.rows
        let data = {
            success: true,
            data: { games }
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
    getGameById,
    getGames,
    addGame,
    deleteGame,
    updateGame
}