import { Module } from "vuex";
import { State } from "../index";

export interface NotificationsState {
  snackbarText: "";
}

export const notifications: Module<NotificationsState, State> = {
  modules: {},
  namespaced: true,
  state: {
    snackbarText: "",
  },
  getters: {
    GET_SNACKBAR_TEXT: (state: NotificationsState) => state.snackbarText,
  },
  mutations: {
    SET_SNACKBAR_TEXT: (state: NotificationsState, snackbarText: "") => {
      state.snackbarText = snackbarText;
    },
  },
  actions: {},
};
