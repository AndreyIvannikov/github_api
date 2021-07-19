<template>
  <router-link to="/" class="back">На главную </router-link>
  <h2 class="info" v-if="loading">loading...</h2>
  <h2 class="info" v-else-if="error">{{ error }}</h2>
  <h2 class="info" v-else-if="repositories.length === 0">Форки не найдены</h2>
  <template v-else>
    <div class="card-wrapper">
      <repositories-item-fork
        v-for="r in repositories"
        :repo="r.owner"
        :key="r.id"
      >
      </repositories-item-fork>
    </div>
    <RepositoriesPagination
      :paginationPage="paginationPage"
      :paginationLength="paginationLength"
      @setPaginationPage="setPaginationPage"
    ></RepositoriesPagination
  ></template>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import RepositoriesItemFork from "./RepositoriesItemFork.vue";
import RepositoriesPagination from "./RepositoriesPagination.vue";
export default {
  components: {
    RepositoriesItemFork,
    RepositoriesPagination,
  },
  setup() {
    const router = useRoute();
    const { state } = useStore();
    const repositories = computed(
      () => store.getters["forks/getForksRepositories"]
    );
    const error = ref();
    const paginationLength = ref(0);
    const store = useStore();
    const loading = ref(true);
    let url = null;

    const findRepositoriesDataUrl = () => {
      return state.repositories.find((elem) => {
        return elem.id === +router.params.id;
      });
    };

    const setPaginationPage = (page) => {
      store.commit("forks/setPageRepositoriesForks", page);
      store.dispatch("forks/fetUsersForksRepositories", url);
    };

    onMounted(async () => {
      try {
        const repositoriesUrl = findRepositoriesDataUrl();
        if (repositoriesUrl) {
          paginationLength.value = repositoriesUrl.forks;
          url = repositoriesUrl.forks_url;
          await store.dispatch("forks/fetUsersForksRepositories", url);
        } else {
          error.value = `Пользователь с таким ${router.params.id} не найден`;
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    });

    return {
      repositories,
      error,
      paginationLength,
      loading,
      setPaginationPage,
      paginationPage: computed(() => store.getters["forks/getPagePagination"]),
    };
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 682px;
}
.back {
  display: inline-block;
  margin-bottom: 30px;
}
</style>
