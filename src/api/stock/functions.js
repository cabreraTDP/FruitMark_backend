
const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "users"    
    })
}
module.exports = {
    prueba
}