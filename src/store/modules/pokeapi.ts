import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";

export interface PokeapiState {
  pokemon: [];
  abilities: [];
}

export const pokeapi: Module<PokeapiState, State> = {
  modules: {},
  namespaced: true,
  state: {
    pokemon: [],
    abilities: [],
  },
  getters: {
    GET_POKEMON: (state: PokeapiState) => state.pokemon,
    GET_ABILITIES: (state: PokeapiState) => state.abilities,
  },
  mutations: {
    SET_POKEMON: (state: PokeapiState, pokemon: []) => {
      state.pokemon = pokemon;
    },
    SET_ABILITIES: (state: PokeapiState, abilities: []) => {
      state.abilities = abilities;
    },
  },
  actions: {
    FETCH_POKEMON_LIST: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/pokemon/?limit=1281`)
          .then((res) => {
            commit("SET_POKEMON", res.data.results);
            resolve(res.data);
          })
          .catch((error) => {
            commit(
              "notifications/SET_SNACKBAR_TEXT",
              "An error occured during the process",
              {
                root: true,
              }
            );
            reject(error.response);
          });
      });
    },
    FETCH_POKEMON: ({ commit, state }, name) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/pokemon/${name}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            commit(
              "notifications/SET_SNACKBAR_TEXT",
              "An error occured during the process",
              {
                root: true,
              }
            );
            reject(error.response);
          });
      });
    },
    FETCH_ABILITIES: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/ability/?limit=1281`)
          .then((res) => {
            res.data.results.unshift({
              name: "",
              url: "",
            });

            commit("SET_ABILITIES", res.data.results);
            resolve(res.data);
          })
          .catch((error) => {
            commit(
              "notifications/SET_SNACKBAR_TEXT",
              "An error occured during the process",
              {
                root: true,
              }
            );
            reject(error.response);
          });
      });
    },
  },
};
