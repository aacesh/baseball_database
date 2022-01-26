const pool = require('../../db')
const queries = require("./queries")

const addUmpire = async (req, res) => {
    const { first_name, last_name, date_of_birth, place_of_birth} = req.body.umpire
    try {
        // let results = await pool.query(queries.addUmpire, [first_name, last_name, date_of_birth, place_of_birth ])
        let results = await pool.query("INSERT INTO umpires(first_name, last_name, date_of_birth, place_of_birth ) VALUES ('Simon', 'Chaudhary', DATE '1995-07-08', 'dhangadi'), ('Santosh', 'Paudel', DATE '1995-07-08', 'pokhara') RETURNING *")
        let umpire = results.rows
        let data = {
            success: true,
            message: 'Umpire created successfully',
            data: { umpire }
        }

        // let umpire = results.rows[0]
        // let data = {
        //     success: true,
        //     message: 'Umpire created successfully',
        //     data: { umpire }
        // }
   
        res.status(201).json(data)
    } catch (error) {
        let data = {
            success: false,
            message: error.message
        }
        res.status(404).json(data)
    }
}


const updateUmpire = async (req, res) => {
    let umpireId = req.params.id
    let { first_name } = req.body.umpire
    try {
        let results = await pool.query(queries.getUmpireById, [umpireId])
        if (results.rowCount < 1) {
            throw new Error(`Umpire with personnel_id ${umpireId} does not exist in database, could not be upated`)
        }
       
        let updatedResults= await pool.query(queries.updateUmpire, [first_name, umpireId])
        let updatedUmpire= updatedResults.rows[0]
        let data = {
            success: true,
            message: `Umpire with personnel_id ${umpireId} updated successfully`,
            updatedUmpire,
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

const deleteUmpire = async (req, res) => {
    let umpireId = req.params.id
    try {
        let results = await pool.query(queries.getUmpireById, [umpireId])
        if (results.rowCount < 1) {
            throw new Error(`Umpire with personnel_id ${umpireId} does not exist in database, could not remove`)
        }
       
        await pool.query(queries.deleteUmpire, [umpireId])
        let data = {
            success: true,
            message: `Umpire with personnel_id ${umpireId} deleted successfully`
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




const getUmpireById = async (req, res) => {
    let umpireId = req.params.id
    try {
        let results = await pool.query(queries.getUmpireById, [umpireId])
        let umpire = results.rows[0]
        let data = {
            success: true,
            data: { umpire }
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


const getUmpires = async (req, res) => {
    try {
        let results = await pool.query(queries.getUmpires)
        let umpires = results.rows
        let data = {
            success: true,
            data: { umpires }
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
    getUmpireById,
    getUmpires,
    addUmpire,
    deleteUmpire,
    updateUmpire
}