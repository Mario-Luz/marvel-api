import axios from 'axios';
import md5 from 'md5';

const baseURL = 'http://gateway.marvel.com/v1/public/'
const publicKey = 'INSIRA AQUI SUA CHAVE PUBLICA'
const privateKey = 'INSIRA AQUI SUA CHAVE PRIVADA'
const timestamp = Number (new Date());
const hash =  md5(timestamp+privateKey+publicKey);



const api = axios.create({
    baseURL:baseURL,
    params:{
        ts:timestamp,
        apikey: publicKey,
        hash:hash,
    },
});
const getCharacters = (
    search: string = "",
    offset: number = 1,
    limit: number = 10
  ) => {
    const searchByName = search !== "" ? `nameStartsWith=${search}&` : ``;
    return fetch(
      `${
       api
      }/characters?${searchByName}ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${
        (offset - 1) * limit
      }`
    ).then((response) => response.json());
  };
  

export default api;
