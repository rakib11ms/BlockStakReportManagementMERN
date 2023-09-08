const Role = require('../models/Role');
const { validationResult } = require('express-validator');

const createRole = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const role = new Role(data);
        await role.save();
        return res.json({
            status: 200,
            role: data
        })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { createRole }