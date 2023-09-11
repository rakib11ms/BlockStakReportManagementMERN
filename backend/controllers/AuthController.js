const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const Role = require('../models/Role');

// const createToken = (user) => {
//     return jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
// }

// Generate an access token
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '30s' });
}

// Generate a refresh token
function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1m' });
}

const register = async (req, res) => {
    const { name, email, password, phone, profession, address,favourite_colors, role } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const duplicate_check = await User.findOne({ email: email }); // Use findOne to find a single matching user

        if (duplicate_check) {
            return res.json({
                status: 400,
                error: 'Email is already in use'
            });
        } else {
            const role = await Role.findOne({ name: 'user' }).select('_id');
            // console.log('role',role);
         
             const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name, email, password: hashedPassword, role:role._id,phone, address,profession, favourite_colors, role
            });
            // console.log('user',user)
            await user.save();


            return res.json({
                status: 200,
                user: user,
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
            return res.json({ status: 400, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: 400, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ status: 400, message: 'Invalid email or password' });
        }

        const user_rel = await User.find({ email: email }).populate('profession').populate('role').exec();


        // const token = jwt.sign(
        //     { userId: user_rel._id, email: user_rel.email },
        //     process.env.SECRET,
        //     { expiresIn: '1h' }
        // );

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set the refresh token as an HttpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            secure: false, // Set to true in production if using HTTPS
            sameSite: 'strict',
        });

        // Send the JWT and user information as a response
        return res.json({
            status: 200,
            user: user_rel,
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

// Route to refresh access token using the refresh token
const refreshTokenFunc = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const accessToken = generateAccessToken({ id: user.userId });
        res.json({ status: 200, accessToken: accessToken });
    });
}
const allUsers = async (req, res) => {
    try {
        const all_users = await User.find({}).populate('profession').populate('role').exec();
        // console.log('all users',all_users)
        return res.json({
            status: 200,
            all_users: all_users
        })
    }
    catch (error) {
        return res.json({
            status: 400,
            message: "Error"
        })
    }

}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.json({ status: 400, message: 'User not found' });
        }

        // After successful deletion, you can fetch the updated list of users and send it as a response
        const allUsers = await User.find({});
        return res.json({ status: 200, message: 'User deleted', all_users: allUsers });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ status: 500, message: 'Internal server error' });

    }

}

module.exports = { register, login, refreshTokenFunc, allUsers, deleteUser };



