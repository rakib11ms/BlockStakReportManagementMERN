const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const { createRole } = require('../controllers/RolePermissionController')
const { createProfession,getAllProfession } = require('../controllers/ProfessionController')
const { register,login, refreshTokenFunc, allUsers, deleteUser} = require('../controllers/AuthController')
const Role = require('../models/Role');
const Profession = require('../models/Profession');
const { verifyToken, checkRole } = require('../middleware/AuthMiddleware')

// router.get('/', (req, res) => {
//     res.json({
//         message: "All is okay"
//     })
// })

router.post('/register',register);
router.post('/login',login);

// router.post('/register',[body('name').notEmpty().withMessage('Name is required'),body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required')],register);

router.get('/all-profession', getAllProfession);
router.post('/refresh-token', refreshTokenFunc);
router.get('/all-users', allUsers);
router.delete('/delete-user/:id',deleteUser );
router.post('/create-role', [body('name').notEmpty().withMessage("Role name is required").custom(async (value) => {
    const existingRole = await Role.findOne({ name: value });
    if (existingRole) {
        throw new Error('Role name must be unique');
    }
    return true;
})], createRole)

router.get('/all-profession', getAllProfession);
router.post('/create-profession', [body('name').notEmpty().withMessage("Profession name is required").custom(async (value) => {
    const existingProfession = await Profession.findOne({ name: value });
    if (existingProfession) {
        throw new Error('Profession name must be unique');
    }
    return true;
})], createProfession)

router.get('/admin-data', verifyToken, checkRole('admin'), (req, res) => {
    res.json({ message: 'Admin data accessed (admin role).' });
  });
  

module.exports = router;