import axios from "axios";

const postData = async (dados) => {
  try {
    const urlDaAPI = "http://127.0.0.1:8000/pacientes/add";
    const resposta = await axios.post(urlDaAPI, dados);
    console.log("Resposta da API:", resposta.data);
  } catch (erro) {
    console.error("Erro ao enviar dados para a API:", erro);
  }
};

export default postData;
