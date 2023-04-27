import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";
import { BasicDataFromApi } from "@/interface";

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
    FETCH_POKEMON_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/pokemon/?limit=1281`)
          .then((res) => {
            const list = res.data.results.map((pokemon: BasicDataFromApi) => {
              let unformattedName = pokemon.name.split("-");

              unformattedName = unformattedName.map((word: string) => {
                return word.replace(word[0], word[0].toUpperCase());
              });

              return {
                codedName: pokemon.name,
                formattedName: unformattedName.join(" "),
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
    FETCH_POKEMON: ({ commit }, name) => {
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
    FETCH_ABILITIES: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/ability/?limit=358`)
          .then((res) => {
            const list = res.data.results.map((ability: BasicDataFromApi) => {
              let unformattedName = ability.name.split("-");

              unformattedName = unformattedName.map((word: string) => {
                return word[0]
                  ? word.replace(word[0], word[0].toUpperCase())
                  : word;
              });

              return {
                codedName: ability.name,
                formattedName: unformattedName.join(" "),
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
    FETCH_ITEMS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/item/?limit=2050`)
          .then((res) => {
            const list = res.data.results.map((item: BasicDataFromApi) => {
              let unformattedName = item.name.split("-");

              unformattedName = unformattedName.map((word: string) => {
                return word[0]
                  ? word.replace(word[0], word[0].toUpperCase())
                  : word;
              });

              return {
                codedName: item.name,
                formattedName: unformattedName.join(" "),
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
    FETCH_ITEM: ({ commit }, name) => {
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
    FETCH_MOVES: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/move/?limit=920`)
          .then((res) => {
            const list = res.data.results.map((move: BasicDataFromApi) => {
              let unformattedName = move.name.split("-");

              unformattedName = unformattedName.map((word: string) => {
                return word[0]
                  ? word.replace(word[0], word[0].toUpperCase())
                  : word;
              });

              return {
                codedName: move.name,
                formattedName: unformattedName.join(" "),
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
    FETCH_MOVE: ({ commit }, name) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"https://pokeapi.co/api/v2"}/move/${name}`)
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
  },
};
