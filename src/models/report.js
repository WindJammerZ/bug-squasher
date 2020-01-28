const mongoose = require('mongoose')

const reportUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    //We set _id to false because we will use the userId instead
    _id: false
})

const reportSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        trim: true,
        required: true,
        default: 'Not assigned'
    },
    assigned: {
        type: Boolean,
        required: true,
        default: false
    },
    owner: {
        // type: mongoose.Schema.Types.ObjectId,
        type: reportUserSchema,
        required: true,
        ref: 'Owner'
    },
    creator: {
        // type: mongoose.Schema.Types.ObjectId,
        type: reportUserSchema,
        required: true,
        ref: 'Creator'
    }
}, {
    timestamps: true
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report