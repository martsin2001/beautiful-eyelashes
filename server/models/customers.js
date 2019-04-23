const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('customers', Customer);