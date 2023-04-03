import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { BasicDataFromApi } from "../interfaces/index";

export interface PokeapiState {
  pokemon: [];
  abilities: [];
  items: [];
  moves: [];
}

export const pokeapi: Module<PokeapiState, State> = {
  modules: {},
  namespaced: true,
  state: {
    pokemon: [],
    abilities: [],
    items: [],
    moves: [],
  },
  getters: {
    GET_POKEMON: (state: PokeapiState) => state.pokemon,
    GET_ABILITIES: (state: PokeapiState) => state.abilities,
    GET_ITEMS: (state: PokeapiState) => state.items,
    GET_MOVES: (state: PokeapiState) => state.moves,
  },
  mutations: {
    SET_POKEMON: (state: PokeapiState, pokemon: []) => {
      state.pokemon = pokemon;
    },
    SET_ABILITIES: (state: PokeapiState, abilities: []) => {
      state.abilities = abilities;
    },
    SET_ITEMS: (state: PokeapiState, items: []) => {
      state.items = items;
    },
    SET_MOVES: (state: PokeapiState, moves: []) => {
      state.moves = moves;
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
            const list = res.data.results.map((ability: BasicDataFromApi) => {
              let unformattedAbility = ability.name.split("-");

              unformattedAbility = unformattedAbility.map((word: string) => {
                return word[0]
                  ? word.replace(word[0], word[0].toUpperCase())
                  : word;
              });

              return {
                name: ability.name,
                url: ability.url,
                codedAbility: ability.name,
                formattedAbility: unformattedAbility.join(" "),
              };
            });

            commit("SET_ABILITIES", list);
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
    FETCH_ITEMS: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/item/?limit=2050`)
          .then((res) => {
            const list = res.data.results.map((item: BasicDataFromApi) => {
              let unformattedItem = item.name.split("-");

              unformattedItem = unformattedItem.map((word: string) => {
                return word[0]
                  ? word.replace(word[0], word[0].toUpperCase())
                  : word;
              });

              return {
                name: item.name,
                url: item.url,
                codedItem: item.name,
                formattedItem: unformattedItem.join(" "),
              };
            });

            commit("SET_ITEMS", list);
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
    FETCH_ITEM: ({ commit, state }, name) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/item/${name}`)
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
    FETCH_MOVES: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/move/?limit=920`)
          .then((res) => {
            const list = res.data.results.map((move: BasicDataFromApi) => {
              let unformattedMove = move.name.split("-");

              unformattedMove = unformattedMove.map((word: string) => {
                return word[0]
                  ? word.replace(word[0], word[0].toUpperCase())
                  : word;
              });

              return {
                name: move.name,
                url: move.url,
                codedMove: move.name,
                formattedMove: unformattedMove.join(" "),
              };
            });

            commit("SET_MOVES", list);
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
