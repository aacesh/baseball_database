const pool = require('../../db')
const queries = require("./queries")

const addManager = async (req, res) => {
    const { first_name, last_name, date_of_birth, place_of_birth} = req.body.manager
    try {
        let results = await pool.query(queries.addManager, [first_name, last_name, date_of_birth, place_of_birth ])
        let manager = results.rows[0]
        let data = {
            success: true,
            message: 'Manager created successfully',
            data: { manager }
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


const updateManager = async (req, res) => {
    let managerId = req.params.id
    let { first_name } = req.body.manager
    try {
        let results = await pool.query(queries.getManagerById, [managerId])
        if (results.rowCount < 1) {
            throw new Error(`Manager with personnel_id ${managerId} does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updateManager, [first_name, managerId])
        let updatedManager= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Manager with personnel_id ${managerId} updated successfully`,
            updatedManager,
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

const deleteManager = async (req, res) => {
    let managerId = req.params.id
    try {
        let results = await pool.query(queries.getManagerById, [managerId])
        if (results.rowCount < 1) {
            throw new Error(`Manager with personnel_id ${managerId} does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deleteManager, [managerId])
        let data = {
            success: true,
            message: `Manager with personnel_id ${managerId} deleted successfully`
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




const getManagerById = async (req, res) => {
    let managerId = req.params.id
    try {
        let results = await pool.query(queries.getManagerById, [managerId])
        let manager = results.rows[0]
        let data = {
            success: true,
            data: { manager }
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


const getManagers = async (req, res) => {
    try {
        let results = await pool.query(queries.getManagers)
        let managers = results.rows
        let data = {
            success: true,
            data: { managers }
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
    getManagerById,
    getManagers,
    addManager,
    deleteManager,
    updateManager
}