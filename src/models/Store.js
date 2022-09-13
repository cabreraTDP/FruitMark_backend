const mongoose = require('mongoose');
const StoreSchema = require('./schemas/StoreSchema');

module.exports = Store = mongoose.model('store', StoreSchema)