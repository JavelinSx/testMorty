<template>
    <div class="pagination">
      <button @click="store.prevPageAction" :disabled="store.currentPage === 1">Назад</button>
      <input type="number" v-model.number="store.currentPage" min="1" :max="store.lastPage"  @change="goToPage">
      <button @click="store.nextPageAction" :disabled="store.currentPage === store.lastPage">Вперед</button>
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
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .pagination button {
        width: 100%;
        padding: 8px 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .pagination button:hover {
        background-color: #45a049;
    }

    .pagination button:disabled {
        background-color: #ddd; 
        cursor: not-allowed;
    }

    .pagination input[type="number"] {
        width: 50px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 0 5px;
    }

    .pagination input[type="number"]:focus {
        outline: none;
        border-color: #4CAF50;
    }
</style>
  