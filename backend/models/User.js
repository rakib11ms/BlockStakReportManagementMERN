const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // default: null
    },
    email: {
        type: String,
        // default: null
    },
    password: {
        type: String,
        // default: null
    },
    phone: {
        type: String,
        // default: null
    },
    address: {
        type: String,
        // default: null
    },
    profession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',
        // default: null

    },
    favourite_colors: {
        type: [String],
        default: []
    }
    , role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        // default: null

    }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;