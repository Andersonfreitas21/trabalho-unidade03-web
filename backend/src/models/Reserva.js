const mongoose = require('mongoose');
//Esquema de como é uma reserva no banco.
const ReservaSchema = new mongoose.Schema({
    motorista: String,
    passageiro: String,
    origem: String,
    destino: String,
    data: String,
    id_passageiro: String, 
});

module.exports = mongoose.model('Reserva', ReservaSchema);