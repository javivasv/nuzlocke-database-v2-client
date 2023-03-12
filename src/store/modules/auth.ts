import { Module } from "vuex";
import { State } from "../index";
import axios from "axios";
import { UserData, Token } from "../interfaces/index";
import jwtDecode from "jwt-decode";

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
            window.localStorage.setItem("pndb_token", res.data.token);
            const token = jwtDecode(res.data.token) as Token;
            commit("SET_USER", { id: token.id, username: token.username });
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
    LOGOUT: ({ commit, state }) => {
      window.localStorage.removeItem("pndb_token");
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
    VALIDATE_SESSION: ({ commit, state, dispatch }) => {
      const token = window.localStorage.getItem("pndb_token");

      if (!token) {
        return;
      }

      const data = {
        token,
      };

      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/session`, data)
          .then((res) => {
            const token = jwtDecode(data.token) as Token;
            commit("SET_USER", { id: token.id, username: token.username });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("LOGOUT");
            reject(error.response);
          });
      });
    },
  },
};
