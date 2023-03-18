import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { Nuzlocke } from "../interfaces/index";

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
    CREATE_NUZLOCKE: ({ commit, state }, data: Nuzlocke) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/nuzlockes`, data)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },
};
