const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();

//String que realiza conexão com banco de dados Mongo Online.
mongoose.connect('mongodb+srv://admin:admin@cluster0.ac8yq.mongodb.net/carona_radar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Aceita conexões de qualquer lugar.
app.use(cors());

//Indica uso de JSON no app.
app.use(express.json());

//Coloca as rotas no app.
app.use(routes);

//Define a porta que o beckend irá escutar as requisição.
app.listen(3333);