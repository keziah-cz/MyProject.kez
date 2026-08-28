const db = require("../config/db");

// GET ALL ANIMALS
const getAnimals = (req, res) => {
    const sql = "SELECT * FROM animals";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to retrieve animals"
            });
        }

        res.status(200).json(results);
    });
};


// GET ONE ANIMAL
const getAnimalById = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM animals WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to retrieve animal"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Animal not found"
            });
        }

        res.status(200).json(results[0]);
    });
};


// CREATE ANIMAL
const createAnimal = (req, res) => {
    const { name, species, breed, age, status } = req.body;

    if (!name || !species) {
        return res.status(400).json({
            message: "Name and species are required"
        });
    }

    if (age !== undefined && (isNaN(age) || age < 0)) {
        return res.status(400).json({
            message: "Age must be a valid positive number"
        });
    }

    const sql = `
        INSERT INTO animals
        (name, species, breed, age, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        species,
        breed || null,
        age || null,
        status || "Available"
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to create animal"
            });
        }

        res.status(201).json({
            message: "Animal created successfully",
            animal: {
                id: result.insertId,
                name,
                species,
                breed: breed || null,
                age: age || null,
                status: status || "Available"
            }
        });
    });
};


// UPDATE ANIMAL
const updateAnimal = (req, res) => {
    const id = req.params.id;

    const { name, species, breed, age, status } = req.body;

    if (!name || !species) {
        return res.status(400).json({
            message: "Name and species are required"
        });
    }

    if (age !== undefined && (isNaN(age) || age < 0)) {
        return res.status(400).json({
            message: "Age must be a valid positive number"
        });
    }

    const sql = `
        UPDATE animals
        SET name = ?, species = ?, breed = ?, age = ?, status = ?
        WHERE id = ?
    `;

    const values = [
        name,
        species,
        breed || null,
        age || null,
        status || "Available",
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to update animal"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Animal not found"
            });
        }

        res.status(200).json({
            message: "Animal updated successfully"
        });
    });
};


// DELETE ANIMAL
const deleteAnimal = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM animals WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to delete animal"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Animal not found"
            });
        }

        res.status(200).json({
            message: "Animal deleted successfully"
        });
    });
};


module.exports = {
    getAnimals,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
};