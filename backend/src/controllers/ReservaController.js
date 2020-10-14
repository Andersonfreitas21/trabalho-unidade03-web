const Carona = require('../models/Carona');
const Concedida = require('../models/Concedida');
const Reserva = require('../models/Reserva');

module.exports = {
    //Controlador para mostrar todas as possíveis reservas de carona do banco.
    async index(request, response){
        const reservas = await Reserva.find();
        return response.json(reservas);
    },

    //Controlador que guarda as posiveis reservas no banco.
    async store(request, response) {
        let motorista = await Carona.find({ tipo: 'Motorista' });
        let passageiro = await Carona.find({ tipo: 'Passageiro' });
        let reserva, verificador;

        //Procura por motorista e passageiro com msm origem, destino e data. Caso exista add no banco.
        for (let i = 0; i < motorista.length; i++) {
            for (let j = 0; j < passageiro.length; j++) {
                if (motorista[i].origem == passageiro[j].origem) {
                    if (motorista[i].destino == passageiro[j].destino) {
                        //Verifica se a carona já foi aceita.
                        if (motorista[i].data == passageiro[j].data) {
                            verificador = await Concedida.findOne({
                                passageiro: passageiro[j].nome
                            });
                            //Caso não tenha sido aceita é criada a possivel carona no banco.
                            if(!verificador){
                                reserva = await Reserva.create({
                                    motorista: motorista[i].nome,
                                    passageiro: passageiro[j].nome,
                                    origem: motorista[i].origem,
                                    destino: motorista[i].destino,
                                    data: motorista[i].data,
                                    id_passageiro: passageiro[i]._id, 
                                });
                                return response.json(reserva);
                            } 
                        }
                    }
                }
            } 
        }
    },

    //Controlador que mostra uma possível reserva em específico.
    async show(request, response){
        const { _id } = request.body
        console.log(_id);
        const reserva = await Reserva.findOne({ _id });
        console.log(reserva);
        return response.json(reserva);
    },

    //Controlador para deletar uma possível reserva.
    async destroy(request, response){
        const { _id } = request.params;
        await Reserva.findByIdAndDelete(_id);
        return response.status(204).send();
    }
};