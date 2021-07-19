<template>
  <form @submit.prevent="searchRepositories">
    <div class="search">
      <label class="search__label" for="search-repo">Имя репозитория:</label>
      <input
        class="search__input"
        type="text"
        id="search-repo"
        placeholder="angular..."
        v-model="searchName"
      />
      <button type="submit" class="btn">Поиск</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["searchRepositories"],
  setup(_, { emit }) {
    const pageNumber = ref(1);
    const store = useStore();
    const searchName = ref(store.state.searchName);

    const isName = () => {
      return store.state.searchName === searchName.value;
    };

    const searchRepositories = async () => {
      if (searchName.value.trim()) {
        if (!isName()) {
          store.commit("setSearchName", searchName.value);
          store.commit("clearPage", searchName.value);
          emit("searchRepositories", searchName.value);
        }
      }
    };
    return {
      searchRepositories,
      searchName,
      pageNumber,
    };
  },
};
</script>
<style lang="scss" scoped>
form {
  margin-bottom: 60px;
}
.search__input {
  background: transparent;
  color: inherit;
  font: inherit;
  outline: none;
  height: 100%;
  border: none;
  border-bottom: 2px solid $basic-white;
  box-sizing: border-box;
  padding: 8px;
  margin-right: 10px;
  &::placeholder {
    color: inherit;
  }
  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: $basic-white;
  }
}
.search {
  display: flex;
  align-items: center;
  height: 40px;
}
.btn {
  background-color: $basic-green;
  border: none;
  padding: 8px;
  font: inherit;
  color: inherit;
  height: 100%;
  border-radius: 6px;
}
</style>
