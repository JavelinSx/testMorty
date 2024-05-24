<template>
    <div class="pagination">
      <button @click="store.prevPageAction" :disabled="store.currentPage === 1">Prev</button>
      <input type="number" v-model.number="store.currentPage" min="1" :max="store.lastPage"  @change="goToPage">
      <button @click="store.nextPageAction" :disabled="store.currentPage === store.lastPage">Next</button>
    </div>
  </template>
  
<script setup lang="ts">
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();

    const goToPage = (event: Event) => {
    const pageNumber = parseInt((event.target as HTMLInputElement).value);
        if (!isNaN(pageNumber)) {
            store.goToPage(pageNumber);
        }
    }

</script>
  
<style scoped>
    .pagination {
    display: flex;
    }

    .pagination button {
    margin: 0 5px;
    }

    .pagination input[type="number"] {
    width: 50px;
    }
</style>
  