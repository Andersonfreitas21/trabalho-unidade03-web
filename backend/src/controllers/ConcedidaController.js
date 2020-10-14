const Concedida = require('../models/Concedida');

module.exports = {
    //Controlador que busca todas as caronas concedidas.
    async index(request, response){
        const concedidas = await Concedida.find();
        return response.json(concedidas);
    },

    //Controlador que cadastra caronas concedidas.
    async store(request, response) {
        const { motorista, passageiro, origem, destino, data } = request.body;

        let concedida = await Concedida.findOne({ motorista, passageiro });

        if (!concedida) {
            await Concedida.create({
                motorista,
                passageiro,
                origem,
                destino,
                data,
            });
            return response.json(Concedida);
        };
    },

    //Controlador que busca uma carona concedida em específico.
    async show(request, response){
        const { _id } = request.body
        const concedida = await Concedida.findOne({ _id });
        return response.json(concedida);
    },
};