import axios from "../http/index";
export default {
  namespaced: true,
  state: {
    forksRepositories: [],
    perPage: 8,
    pageNumber: 1,
  },

  mutations: {
    setRepositoriesForks(state, forks) {
      state.forksRepositories = forks;
    },
    setPageRepositoriesForks(state, pageNumber) {
      state.pageNumber = pageNumber;
    },
  },
  getters: {
    getForksRepositories(state) {
      return state.forksRepositories;
    },
    getPagePagination(state) {
      return state.pageNumber;
    },
    getPerPagePagination(state) {
      return state.perPage;
    },
  },

  actions: {
    async fetUsersForksRepositories({ state, commit }, url) {
      const forks = await axios.get(
        `${url}?per_page=${state.perPage}&page=${state.pageNumber}`
      );
      console.log(forks);
      commit("setRepositoriesForks", forks.data);
    },
  },
};
