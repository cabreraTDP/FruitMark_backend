const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    stock: [
        {
            fruit: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 0,
                min: 0
            }
        }
    ]
});

module.exports = StoreSchema;