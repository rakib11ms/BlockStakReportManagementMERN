const { validationResult } = require('express-validator');
const Profession=require('../models/Profession')

const createProfession = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const profession = new Profession(data);
        await profession.save();
        return res.json({
            status: 200,
            profession: data
        })
    }
    catch (err) {
        console.log(err)
    }
}
const getAllProfession = async (req, res) => {
    const allProfession = await Profession.find({});
    return res.json({
        status: 200,
        allProfession: allProfession
    })
}

module.exports = { createProfession,getAllProfession }

