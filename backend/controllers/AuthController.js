const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
}

const register = async (req, res) => {
    const { name, email, password, phone, profession, favourite_colors, role } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const duplicate_check = await User.findOne({ email: email }); // Use findOne to find a single matching user

        if (duplicate_check) {
            return res.status(400).json({
                errors: [{ msg: 'Email is already in use' }]
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name, email, password: hashedPassword, phone, profession, favourite_colors, role
            });
            // console.log('user',user)
            await user.save();

            const token = createToken({ name, email });
            // console.log('token',token)

            return res.json({
                status: 200,
                user: user,
                token: token,
                message: "Registration successful"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{ msg: 'Internal Server Error' }]
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({status:400, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status:400,message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user_rel = await User.find({ email: email }).populate('profession').populate('role').exec();


        const token = jwt.sign(
            { userId: user_rel._id, email: user_rel.email },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        // Send the JWT and user information as a response
        return res.json({
            user: user_rel,
            token,
            message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = { register, login };



