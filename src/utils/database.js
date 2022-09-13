const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connection = async() => {
    try {
        const mongodb = await mongoose.connect(uri, {    });
        return mongodb
    } catch (e) {
        console.error(e)
    }
}

module.exports = { connection }
