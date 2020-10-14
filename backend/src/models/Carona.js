const mongoose = require('mongoose');
//Esquema de como é uma carona no banco.
const CaronaSchema = new mongoose.Schema({
    tipo: String,
    nome: String,
    origem: String,
    destino: String,
    data: String,
});

module.exports = mongoose.model('Carona', CaronaSchema);