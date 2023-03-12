import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { UserData } from "../interfaces/index";

export interface AuthState {
  user: null;
}

export const auth: Module<AuthState, State> = {
  modules: {},
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
  actions: {
    LOGIN: ({ commit, state }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/login`, data)
          .then((res) => {
            commit("SET_USER", res.data.user);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
    LOGOUT: ({ commit, state }) => {
      commit("SET_USER", null);
    },
    REGISTER_USER: ({ commit, state }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/users`, data)
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
