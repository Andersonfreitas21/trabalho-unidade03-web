import axios from 'axios';

//Definindo endereço que backend escuta para realizar conexão com front.
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;