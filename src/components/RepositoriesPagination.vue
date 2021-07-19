<template>
  <div class="pagination">
    <button @click="prev" :disabled="minPage">Назад</button>
    <button
      v-for="r in pagination"
      :class="{ active: r === paginationPage }"
      :key="r"
      @click="paginationSelect(r)"
    >
      {{ r }}
    </button>
    <button @click="next" :disabled="isMaxPage">Вперед</button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    paginationLength: {
      type: Number,
      default: 1,
    },
    paginationPage: {
      type: Number,
      default: 1,
    },
  },
  emits: ["setPaginationPage"],

  setup(props, { emit }) {
    const store = useStore();

    const currentPage = ref(1);

    const prev = () => {
      emit("setPaginationPage", Math.min(...pagination.value) - 3);
      currentPage.value--;
    };

    const next = () => {
      emit("setPaginationPage", Math.min(...pagination.value) + 3);
      currentPage.value++;
    };

    const isMaxPage = computed(
      () =>
        Math.ceil(
          props.paginationLength / store.getters["forks/getPerPagePagination"]
        ) <=
        currentPage.value * 3
    );

    const paginationSelect = (value) => {
      emit("setPaginationPage", value);
    };

    const pagination = computed(() => {
      const maxPage = Math.ceil(props.paginationLength / store.state.perPage);
      const arr = [];
      for (let i = 1; i <= maxPage; i++) {
        arr.push(i);
      }
      return arr.slice(
        (currentPage.value - 1) * 3,
        (currentPage.value - 1) * 3 + 3
      );
    });

    return {
      prev,
      next,
      paginationSelect,
      isMaxPage,
      minPage: computed(() => 1 >= props.pageNumber),
      pagination,
      currentPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  width: 200px;
}
button {
  background-color: $basic-green;
  color: inherit;
  border: none;
  padding: 8px;
  border-radius: 6px;
  margin-right: 5px;
  &:not(:disabled):not(.active):hover {
    background-color: rgb(51, 44, 44);
  }
}
button:disabled {
  opacity: 0.4;
}

.active {
  background-color: #000;
}
</style>
