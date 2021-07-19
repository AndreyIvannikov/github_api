import axios from "../http/index";
import { createStore } from "vuex";
import forks from "./forks";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      perPage: 8,
      repositories: [],
      repositoriesLength: null,
      searchName: "",
      pageNumber: 1,
      error: "",
    };
  },
  mutations: {
    setRepositories(state, repositories) {
      state.repositories = repositories;
    },

    setErrorMessage(state, errorMessage) {
      state.error = errorMessage;
    },

    setSearchName(state, searchName) {
      state.searchName = searchName;
    },

    setPageRepositories(state, pageNumber) {
      state.pageNumber = pageNumber;
    },

    setRepositoriesLength(state, repositoriesLength) {
      state.repositoriesLength = repositoriesLength;
    },

    clearPage(state) {
      state.pageNumber = 1;
    },
  },
  actions: {
    async fetchUserRepositories({ state, commit }) {
      const url = `users/${state.searchName}/repos?page=${state.pageNumber}&per_page=${state.perPage}&sort=stars`;
      const userRepositories = await axios.get(url);
      console.log(userRepositories);
      commit("setRepositories", userRepositories.data);
    },

    async fetchUserRepositoriesLength({ state, commit }) {
      const { data } = await axios.get(`users/${state.searchName}`);
      commit("setRepositoriesLength", data.public_repos);
    },
  },
  getters: {
    getPageNumber(state) {
      return state.pageNumber;
    },
  },
  modules: { forks },
});

export default store;
