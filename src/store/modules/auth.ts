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
    REGISTER_USER: ({ commit, state }, data: UserData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/users`, data)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            console.log("ERROR: ", error);
            reject(error);
          });
      });
    },
  },
};
