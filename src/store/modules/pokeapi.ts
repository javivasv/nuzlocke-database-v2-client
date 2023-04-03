import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { BasicDataFromApi } from "../interfaces/index";

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
            const list = res.data.results.map((pokemon: BasicDataFromApi) => {
              let unformattedSpecies = pokemon.name.split("-");

              unformattedSpecies = unformattedSpecies.map((word: string) => {
                return word.replace(word[0], word[0].toUpperCase());
              });

              return {
                name: pokemon.name,
                url: pokemon.url,
                codedSpecies: pokemon.name,
                formattedSpecies: unformattedSpecies.join(" "),
              };
            });

            commit("SET_POKEMON", list);
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
          .get(`${"https://pokeapi.co/api/v2"}/ability/?limit=358`)
          .then((res) => {
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
