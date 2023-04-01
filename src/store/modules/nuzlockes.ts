import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { Nuzlocke, UpdateNuzlockeData } from "../interfaces/index";

export interface NuzlockesState {
  nuzlockes: [];
  nuzlocke: null;
}

export const nuzlockes: Module<NuzlockesState, State> = {
  modules: {},
  namespaced: true,
  state: {
    nuzlockes: [],
    nuzlocke: null,
  },
  getters: {
    GET_NUZLOCKES: (state: NuzlockesState) => state.nuzlockes,
    GET_NUZLOCKE: (state: NuzlockesState) => state.nuzlocke,
  },
  mutations: {
    SET_NUZLOCKES: (state: NuzlockesState, nuzlockes: []) => {
      state.nuzlockes = nuzlockes;
    },
    SET_NUZLOCKE: (state: NuzlockesState, nuzlocke: null) => {
      state.nuzlocke = nuzlocke;
    },
  },
  actions: {
    FETCH_NUZLOCKES: ({ commit, state, dispatch }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"http://localhost:5000/api"}/nuzlockes`)
          .then((res) => {
            commit("SET_NUZLOCKES", res.data.nuzlockes);
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    CREATE_NUZLOCKE: ({ commit, state, dispatch }, data: Nuzlocke) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/nuzlockes`, data)
          .then((res) => {
            commit("SET_NUZLOCKES", res.data.nuzlockes);
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    FETCH_NUZLOCKE: ({ commit, state, dispatch }, id: string) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"http://localhost:5000/api"}/nuzlocke/${id}`)
          .then((res) => {
            commit("SET_NUZLOCKE", res.data.nuzlocke);
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    UPDATE_NUZLOCKE: ({ commit, dispatch }, data: UpdateNuzlockeData) => {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `${"http://localhost:5000/api"}/nuzlocke/${data.nuzlockeId}`,
            data.nuzlocke
          )
          .then((res) => {
            commit("nuzlockes/SET_NUZLOCKE", res.data.nuzlocke, { root: true });
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_SESSION_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    DELETE_NUZLOCKE: ({ commit, dispatch }, id: string) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${"http://localhost:5000/api"}/nuzlocke/${id}`)
          .then((res) => {
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
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
