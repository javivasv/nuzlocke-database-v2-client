import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import {
  CreateTeamData,
  UpdateTeamData,
  DeletePokemonData,
} from "../interfaces/index";

export interface TeamsState {}

export const teams: Module<TeamsState, State> = {
  modules: {},
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ADD_TEAM: ({ commit, dispatch }, data: CreateTeamData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${"http://localhost:5000/api"}/nuzlocke/${data.nuzlockeId}/team`,
            data.team
          )
          .then((res) => {
            commit("nuzlockes/SET_NUZLOCKE", res.data.nuzlocke, { root: true });
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    UPDATE_TEAM: ({ commit, dispatch }, data: UpdateTeamData) => {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `${"http://localhost:5000/api"}/nuzlocke/${data.nuzlockeId}/team/${
              data.teamId
            }`,
            data.team
          )
          .then((res) => {
            commit("nuzlockes/SET_NUZLOCKE", res.data.nuzlocke, { root: true });
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    /*
    DELETE_POKEMON: ({ commit, dispatch }, data: DeletePokemonData) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${"http://localhost:5000/api"}/nuzlocke/${
              data.nuzlockeId
            }/pokemon/${data.pokemonId}`
          )
          .then((res) => {
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    */
  },
};
