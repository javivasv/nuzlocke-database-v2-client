import Vue from "vue";

export interface AuthState {
  user: null;
}

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    GET_USER: (state: AuthState) => state.user,
  },
  mutations: {
    SET_USER: (state: AuthState, user: null) => {
      state.user = user;
    },
  },
  actions: {},
};
