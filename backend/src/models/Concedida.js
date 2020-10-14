const mongoose = require('mongoose');
//Esquema de como é uma carona concedida no banco.
const ConcedidaSchema = new mongoose.Schema({
    motorista: String,
    passageiro: String,
    origem: String,
    destino: String,
    data: String
});

module.exports = mongoose.model('Concedida', ConcedidaSchema);