import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";
import { Nuzlocke, UpdateNuzlockeData } from "@/interface";

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
    FETCH_NUZLOCKES: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API}/nuzlockes`)
          .then((res) => {
            commit("SET_NUZLOCKES", res.data.nuzlockes);
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    CREATE_NUZLOCKE: ({ commit, dispatch }, data: Nuzlocke) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API}/nuzlocke`, data)
          .then((res) => {
            commit("SET_NUZLOCKES", res.data.nuzlockes);
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
    FETCH_NUZLOCKE: ({ commit, dispatch }, id: string) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API}/nuzlocke/${id}`)
          .then((res) => {
            commit("SET_NUZLOCKE", res.data.nuzlocke);
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    UPDATE_NUZLOCKE: ({ commit, dispatch }, data: UpdateNuzlockeData) => {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `${process.env.VUE_APP_API}/nuzlocke/${data.nuzlockeId}`,
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
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
    DELETE_NUZLOCKE: ({ commit, dispatch }, id: string) => {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_API}/nuzlocke/${id}`)
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
