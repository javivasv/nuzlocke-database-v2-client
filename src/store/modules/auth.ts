import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";
import { UserData, Token, EmailData } from "@/interface";
import jwtDecode from "jwt-decode";
import router from "@/router";

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = window.localStorage.getItem("ndb_token");
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
    LOGIN: ({ commit }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API}/login`, data)
          .then((res) => {
            window.localStorage.setItem("ndb_token", res.data.token);
            const token = jwtDecode(res.data.token) as Token;
            commit("SET_USER", {
              _id: token._id,
              email: token.email,
              username: token.username,
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
    LOGOUT: ({ commit }) => {
      window.localStorage.removeItem("ndb_token");
      commit("SET_USER", null);
      commit("nuzlockes/SET_NUZLOCKES", [], { root: true });
      commit("nuzlockes/SET_NUZLOCKE", null, { root: true });
      commit("pokeapi/SET_POKEMON", [], { root: true });
      router.push({
        name: "home",
      });
    },
    REGISTER_USER: ({ commit }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API}/users`, data)
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
    VALIDATE_SESSION: ({ commit, dispatch }) => {
      const token = window.localStorage.getItem("ndb_token");

      if (!token) {
        return;
      }

      const data = {
        token,
      };

      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API}/session`, data)
          .then((res) => {
            const token = jwtDecode(data.token) as Token;
            commit("SET_USER", {
              _id: token._id,
              email: token.email,
              username: token.username,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("VALIDATE_ERROR", error);
            reject(error.response);
          });
      });
    },
    VALIDATE_ERROR: ({ commit, dispatch }, error) => {
      if (!error.response) {
        return;
      }

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
    FORGOT_PASSWORD: ({ commit }, data: EmailData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API}/forgot-password`, data)
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
    VALIDATE_RESET_TOKEN: (_store, resetToken: string) => {
      if (!resetToken) {
        return;
      }

      const data = {
        resetToken,
      };

      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API}/validate-reset-token`, data)
          .then(() => {
            const token = jwtDecode(resetToken);
            resolve(token);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
    RESET_PASSWORD: ({ commit }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .put(`${process.env.VUE_APP_API}/users/reset-password`, data)
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
  },
};
