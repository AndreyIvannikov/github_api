<template>
  <RepositoriesForm
    @search-repositories="fetchUserRepositories"
  ></RepositoriesForm>
  <h2 class="loading" v-if="error">{{ error }}</h2>
  <div v-else-if="repositories.length === 0">Данных нет</div>

  <template v-else>
    <p class="loading" v-if="loading">loading....</p>
    <div class="card-wrapper" v-else>
      <RepositoriesItem
        v-for="r in repositories"
        :repo="r"
        :key="r.id"
        @click="forks(r.id)"
      >
      </RepositoriesItem>
    </div>
    <RepositoriesPagination
      :paginationPage="paginationPage"
      :paginationLength="paginationLength"
      @setPaginationPage="setPaginationPage"
    ></RepositoriesPagination>
  </template>
</template>

<script>
import RepositoriesItem from "./RepositoriesItem.vue";
import RepositoriesForm from "./RepositoriesForm.vue";
import RepositoriesPagination from "./RepositoriesPagination.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: { RepositoriesItem, RepositoriesForm, RepositoriesPagination },
  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = ref(false);
    const error = ref(null);
    const paginationLength = computed(() => store.state.repositoriesLength);
    let url = null;

    const setPaginationPage = (page) => {
      store.commit("setPageRepositories", page);
      store.dispatch("fetchUserRepositories", url);
    };

    const forks = (id) => {
      router.push(`/forks/${id}`);
    };

    const fetchUserRepositories = async () => {
      try {
        loading.value = true;
        await store.dispatch("fetchUserRepositories");
        await store.dispatch("fetchUserRepositoriesLength");
      } catch ({ response }) {
        error.value = store.commit("setErrorMessage", response.data.message);
      } finally {
        loading.value = false;
      }
    };

    return {
      fetchUserRepositories,
      forks,
      repositories: computed(() => store.state.repositories),
      paginationPage: computed(() => store.getters["getPageNumber"]),
      loading,
      error,
      paginationLength,
      setPaginationPage,
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
.loading {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
