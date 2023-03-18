import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";

export interface NuzlockesState {
  nuzlockes: [];
}

export const nuzlockes: Module<NuzlockesState, State> = {
  modules: {},
  namespaced: true,
  state: {
    nuzlockes: [],
  },
  getters: {
    GET_NUZLOCKES: (state: NuzlockesState) => state.nuzlockes,
  },
  mutations: {
    SET_NUZLOCKES: (state: NuzlockesState, nuzlockes: []) => {
      state.nuzlockes = nuzlockes;
    },
  },
  actions: {
    FETCH_NUZLOCKES: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${"http://localhost:5000/api"}/nuzlockes`)
          .then((res) => {
            commit("SET_NUZLOCKES", res.data.nuzlockes);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },
};
