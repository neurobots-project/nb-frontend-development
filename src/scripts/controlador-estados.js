import { create } from "zustand";
import axios from "axios"; // Certifique-se de importar axios
import { getDistance } from "../scripts/distancia";
import { createContext, useContext } from "react";

const apiKey = "1e469ea4b5d9425c9bbe2b158852c80d";

export const useStore = create((set, get) => ({
  name: "",
  email: "",
  whatsapp: "",
  state: "",
  city: "",
  hasAvc: "",
  hasAnotherCondition: "",
  investmentAmount: "",

  armazenaInvestmentAmount: (payload) => set({ investmentAmount: payload }),
  armazenaHasAnotherCondition: (payload) =>
    set({ hasAnotherCondition: payload }),
  armazenaHasAvc: (payload) => set({ hasAvc: payload }),
  armazenaCity: (payload) => set({ city: payload }),
  armazenaState: (payload) => set({ state: payload }),
  armazenaWhatsapp: (payload) => set({ whatsapp: payload }),
  armazenaEmail: (payload) => set({ email: payload }),
  armazenaName: (payload) => set({ name: payload }),

  data: [],

  origem: [-8.062, -34.8725],
  destino: [],

  postData: async () => {
    const {
      name,
      email,
      whatsapp,
      state,
      city,
      hasAvc,
      hasAnotherCondition,
      investmentAmount,
    } = get(); // Acessar os valores atuais do estado

    const dados = {
      name,
      email,
      whatsapp,
      state,
      city,
      hasAvc,
      hasAnotherCondition,
      investmentAmount,
    };
    try {
      const urlDaAPI = "https://neurobots2.ue.r.appspot.com/pacientes/add";
      const resposta = await axios.post(urlDaAPI, dados);
      console.log("Resposta da API:", resposta.data);
    } catch (erro) {
      console.error("Erro ao enviar dados para a API:", erro);
    }
  },

  fetch: async () => {
    const response = await fetch("https://api-clinics.rj.r.appspot.com/all");
    set({ data: await response.json() });
  },

  fetchLatLong: async (cep) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${apiKey}`
      );
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry;
      set({ origem: [lat, lng] });
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lng", lng);
    } catch (error) {
      console.error("Erro ao obter dados de geolocalização:", error);
    }
  },

  armazenaOrigem: (payload1, payload2) => set({ origem: [payload1, payload2] }),
  armazenaDestino: (payload1, payload2) =>
    set({ destino: [payload1, payload2] }),
}));
