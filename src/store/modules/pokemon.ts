import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { CreatePokemonData, UpdatePokemonData } from "../interfaces/index";

export interface PokemonState {}

export const pokemon: Module<PokemonState, State> = {
  modules: {},
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ADD_POKEMON: ({ commit }, data: CreatePokemonData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${"http://localhost:5000/api"}/nuzlocke/${
              data.nuzlockeId
            }/pokemon`,
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
    UPDATE_POKEMON: ({ commit }, data: UpdatePokemonData) => {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `${"http://localhost:5000/api"}/nuzlocke/${
              data.nuzlockeId
            }/pokemon/${data.pokemonId}`,
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
    DELETE_POKEMON: ({ commit }, data: UpdatePokemonData) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${"http://localhost:5000/api"}/nuzlocke/${
              data.nuzlockeId
            }/pokemon/${data.pokemonId}`
          )
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },
};
