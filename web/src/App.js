import React, { useState, useEffect } from 'react';
import api from './services/api';

//Importação dos estilos da página.
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  //Declaração de estados para que o react possa observar mudanças de valor.
  const [reservas, setReservas] = useState([]);
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');

  //Função roda junto com carregamento da pagina e reload.
  useEffect(() => {
    async function loadCaronas() {
      let response = await api.get('/concedidas');
      setReservas(response.data);
    }
    loadCaronas();
  }, []);

  //Função chamada ao apertar botão salvar do formulário.
  async function addCarona(e) {
    e.preventDefault();

    //Cadastrando novo usuário.
    await api.post('/caronas', {
      tipo,
      nome,
      origem,
      destino,
      data
    });

    //Limpando formulário após submit.
    setTipo('');
    setNome('');
    setOrigem('');
    setDestino('');
    setData('');

    //Carrega as possiveis reservas no banco.
    await api.post('/reservas',{});

    //Puxa reserva na triagem.
    let response = await api.get('/reservas');
    let reserva = response.data[0];
    
    //Verificação para caso não exista possível reserva.
    if(reserva){

      //Pergunta se motorista deseja conceder carona.
      let resultado = window.confirm(`${reserva.motorista}, concede carona à ${reserva.passageiro}?`);

      //caso motorisca conceda carona, add concecao de carona no banco.
      if (resultado) {
        await api.post('/concedidas', reserva);
      }

      //retira passageiro do banco de caronas.
      await api.delete(`/caronas/${reserva.id_passageiro}`);

      //retira carona do banco de possíveis caronas.
      await api.delete(`/reservas/${reserva._id}`);
      response = await api.get('/concedidas');

      //mostrar reservas na tela.
      setReservas(response.data);
    }
  }

  //Abaixo estrutura HTML da página.
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={addCarona}>

          <div className="input-block">
            <label htmlFor="tipo">Tipo</label>
            <input
              type='text'
              name="tipo"
              id="tipo"
              required
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="nome">Nome</label>
            <input
              name="nome"
              id="nome"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="origem">Origem</label>
            <input
              name="origem"
              id="origem"
              required
              value={origem}
              onChange={e => setOrigem(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="destino">Destino</label>
            <input
              name="destino"
              id="destino"
              required
              value={destino}
              onChange={e => setDestino(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="data">Data</label>
            <input
              name="data"
              id="data"
              required
              value={data}
              onChange={e => setData(e.target.value)}
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {reservas.map(reserva => (
            <li key={reserva._id} className="carona-item">
              <header>
                <div className="carona-info">
                  <strong>{reserva.motorista}</strong>
                  <span>Motorista</span>
                  <br></br>
                  <strong>{reserva.passageiro}</strong>
                  <span>Passageiro</span>
                </div>
              </header>
              <p>Origem: {reserva.origem}</p>
              <p>Destino: {reserva.destino}</p>
              <p>Data: {reserva.data}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;