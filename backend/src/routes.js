const { Router } = require('express');
const CaronaController = require('./controllers/CaronaController');
const ReservaController = require('./controllers/ReservaController');
const ConcedidaController = require('./controllers/ConcedidaController');

const routes = Router();

//Rotas usuários.
routes.get('/caronas', CaronaController.show);//Busca todos os usuários.
routes.post('/caronas', CaronaController.store);//Cadastra usuários.
routes.delete('/caronas/:nome', CaronaController.destroy);//Deleta um usuário.

//Rotas possíveis caronas.
routes.get('/reservas', ReservaController.index); //Busca todas as possíveis caronas.
routes.get('/reserva', ReservaController.show); //Busca uma carona específica.
routes.post('/reservas', ReservaController.store); //Cadastra possíveis reservas.
routes.delete('/reservas/:_id', ReservaController.destroy);//Deleta uma possível reserva.

//Rotas caronas concedidas.
routes.get('/concedidas', ConcedidaController.index);//Busca todas as caronas concedidas.
routes.post('/concedidas', ConcedidaController.store);//Cadastra caronas concedidas.

module.exports = routes;