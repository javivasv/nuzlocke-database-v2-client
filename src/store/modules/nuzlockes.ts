import { Module } from "vuex";
import { State } from "../index";

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
  actions: {},
};
