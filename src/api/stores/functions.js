const Store = require("../../models/Store");

const getAllStores = async(req,res) => {

    try{
        const stores = await Store.find({},{_id:0});
        console.log(stores)
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

const sendStockAmongStores = async(req,res) => {
    const {sourceStoreCity, targetStoreCity, fruit, quantity} = req.body;

    try{
        const sourceStore = await Store.find(
            {city: sourceStoreCity}, 
            {stock: {$elemMatch: {fruit: fruit}}, _id:0}
        );

        const targetStore = await Store.find({city: targetStoreCity},{city:1,_id:0})

        if(sourceStore.length === 0){
            res.status(400).json({
                message: 'The source store does not exist.'
            });
        }else if(targetStore.length === 0){
            res.status(400).json({
                message: 'The target does not have the specified fruit.'
            });
        }else if(sourceStore[0].stock.length === 0){
            res.status(400).json({
                message: 'The store does not have the specified fruit.'
            });
        }else if(sourceStore[0].stock[0].quantity < quantity){
            res.status(400).json({
                message: 'The store does not have enough fruit for this transfer.'
            });
        }
        else{
            await Store.updateOne({city:sourceStoreCity, stock: {$elemMatch: {fruit: fruit}}},
                {
                    $inc: {
                        "stock.$.quantity": quantity*(-1)
                    }
                }
            );

            await Store.updateOne({city:targetStoreCity, stock: {$elemMatch: {fruit: fruit}}},
                {
                    $inc: {
                        "stock.$.quantity": quantity
                    }
                }
            );

            res.status(200).json({
                message: 'transfer made successfully.'
            });
        }

    }catch(e){
        console.error(e)
        res.status(400).json({
            message: 'There was an Error'
        })
    }

}

module.exports = {
    getAllStores,
    sendStockAmongStores
}