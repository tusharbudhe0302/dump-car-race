const mongoose  = require('../utils').mongoose;
const uuid = require('uuid');

const memberSchema = new mongoose.Schema ({
    _id: {
        type: String,
        default: uuid.v1
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String
    },
    team: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    }
},
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified'
        },
        versionKey: false
    });
module.exports = mongoose.model('member', memberSchema);