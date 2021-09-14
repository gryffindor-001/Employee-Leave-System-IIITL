const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: String,
        required: true,
        trim: true
    },
    startTimeDay: {
        type: Number,
        required: true
    },
    startTimeMonth: {
        type: Number,
        required: true
    },
    startTimeYear: {
        type: Number,
        required: true
    },
    endTimeDay: {
        type: Number,
        required: true
    },
    endTimeMonth: {
        type: Number,
        required: true
    },
    endTimeYear: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
})

const Leave = mongoose.model('request', leaveSchema)

module.exports = Leave