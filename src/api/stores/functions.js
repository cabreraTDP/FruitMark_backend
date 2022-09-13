const store = require("../../models/store");

const getAllStores = async(req,res) => {

    try{

        const stores = await store.find({});
        res.status(200).json({
            data: stores
        });

    }catch(e){
        console.error(e)
        res.status(400).json({
            message: 'There was an Error'
        })
    }
    
}

module.exports = {
    getAllStores
}