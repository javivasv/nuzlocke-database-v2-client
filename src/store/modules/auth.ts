import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";
import { UserData, Token } from "@/interface";
import jwtDecode from "jwt-decode";
import router from "@/router";

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = window.localStorage.getItem("pndb_token");
  return config;
});

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
    LOGIN: ({ commit, state, dispatch }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/login`, data)
          .then((res) => {
            window.localStorage.setItem("pndb_token", res.data.token);
            const token = jwtDecode(res.data.token) as Token;
            commit("SET_USER", { _id: token._id, username: token.username });
            resolve(res.data);
          })
          .catch((error) => {
            commit("notifications/SET_SNACKBAR_TEXT", error.response.data.msg, {
              root: true,
            });
            reject(error.response);
          });
      });
    },
    LOGOUT: ({ commit, state }) => {
      window.localStorage.removeItem("pndb_token");
      commit("SET_USER", null);
      commit("nuzlockes/SET_NUZLOCKES", [], { root: true });
      commit("nuzlockes/SET_NUZLOCKE", null, { root: true });
      commit("pokeapi/SET_POKEMON", [], { root: true });
      router.push({
        name: "home",
      });
    },
    REGISTER_USER: ({ commit, state, dispatch }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/users`, data)
          .then((res) => {
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            commit("notifications/SET_SNACKBAR_TEXT", error.response.data.msg, {
              root: true,
            });
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
            commit("SET_USER", { _id: token._id, username: token.username });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("VALIDATE_ERROR", error);
            reject(error.response);
          });
      });
    },
    VALIDATE_ERROR: ({ commit, state, dispatch }, error) => {
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 404
      ) {
        dispatch("LOGOUT");
      }

      commit("notifications/SET_SNACKBAR_TEXT", error.response.data.msg, {
        root: true,
      });
    },
  },
};
