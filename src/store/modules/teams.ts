import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";
import { CreateTeamData, UpdateTeamData, DeleteTeamData } from "@/interface";

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
            `${process.env.VUE_APP_API}/nuzlocke/${data.nuzlockeId}/team`,
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
            `${process.env.VUE_APP_API}/nuzlocke/${data.nuzlockeId}/team/${data.teamId}`,
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
    DELETE_TEAM: ({ commit, dispatch }, data: DeleteTeamData) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${process.env.VUE_APP_API}/nuzlocke/${data.nuzlockeId}/team/${data.teamId}`
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
  },
};
