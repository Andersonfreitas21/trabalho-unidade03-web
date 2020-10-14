const Carona = require('../models/Carona');

module.exports = {
    //Controlador que puxa todos os usuarios do banco e retorna na resposta.
    async show(request, response){
        const caronas = await Carona.find();
        return response.json(caronas);
    },

    //Controlador que realiza cadastro de novos usuários no banco.
    async store(request, response) {
        const { tipo, nome, origem, destino, data } = request.body;

        let carona = await Carona.findOne({ nome });

        if (!carona) {
            carona = await Carona.create({
                tipo,
                nome,
                origem,
                destino,
                data,
            });
            return response.json(carona);
        };
    },

    //Controlador que deleta usuários do banco.
    async destroy(request, response){
        const { nome } = request.params;
        await Carona.findByIdAndDelete(nome);
        return response.status(204).send();
    }
};