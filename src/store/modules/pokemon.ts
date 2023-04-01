import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import {
  CreatePokemonData,
  UpdatePokemonData,
  DeletePokemonData,
} from "../interfaces/index";

export interface PokemonState {}

export const pokemon: Module<PokemonState, State> = {
  modules: {},
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ADD_POKEMON: ({ commit, dispatch }, data: CreatePokemonData) => {
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
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    UPDATE_POKEMON: ({ commit, dispatch }, data: UpdatePokemonData) => {
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
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    DELETE_POKEMON: ({ commit, dispatch }, data: DeletePokemonData) => {
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
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
  },
};
