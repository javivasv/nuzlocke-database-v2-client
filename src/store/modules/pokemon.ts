import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { PokemonData } from "../interfaces/index";

export interface PokemonState {}

export const pokemon: Module<PokemonState, State> = {
  modules: {},
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ADD_POKEMON: ({ commit, rootGetters }, data: PokemonData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${"http://localhost:5000/api"}/nuzlocke/${data.id}/pokemon`,
            data.pokemon
          )
          .then((res) => {
            commit("nuzlockes/SET_NUZLOCKE", res.data.nuzlocke, { root: true });
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },
};
