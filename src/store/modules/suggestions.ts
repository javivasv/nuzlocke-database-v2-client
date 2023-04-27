import { Module } from "vuex";
import { State } from "@/store/index";
import axios from "axios";
import { SuggestionData } from "@/interface";

export interface SuggestionsState {}

export const suggestions: Module<SuggestionsState, State> = {
  modules: {},
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    SEND_SUGGESTION: ({ commit, dispatch }, data: SuggestionData) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${"http://localhost:5000/api"}/suggestions`, data)
          .then((res) => {
            commit("notifications/SET_SNACKBAR_TEXT", res.data.msg, {
              root: true,
            });
            resolve(res.data);
          })
          .catch((error) => {
            dispatch("auth/VALIDATE_ERROR", error, { root: true });
            reject(error.response);
          });
      });
    },
  },
};
