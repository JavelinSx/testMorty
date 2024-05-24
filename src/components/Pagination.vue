<template>
    <div class="pagination-container">
        <div class="pagination">

            <button 
                @click="store.prevPageAction" 
                :disabled="store.currentPage === 1"
            >Назад</button>

            <input 
                type="number" 
                v-model="store.currentPage" 
                min="1" 
                :max="store.lastPage" 
                :disabled="store.characters.length===1" 
                @change="goToPage"
                @v-on:keyup.enter="console.log('hello')"
            >

            <button 
                @click="store.nextPageAction" 
                :disabled="store.currentPage === store.lastPage || store.characters.length<20"
            >Вперед</button>

        </div>
        <span class="pagination-page-count">{{ store.currentPage }} из {{ maxPage }}</span>
    </div>
    
  </template>
  
<script setup lang="ts">
    import { computed } from 'vue';
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();
    const maxPage = computed(() => store.lastPage);
    const goToPage = (event: Event) => {
        
        const pageNumber = parseInt((event.target as HTMLInputElement).value);

        if (!isNaN(pageNumber) && pageNumber<=store.lastPage) {
            store.goToPageView(pageNumber);
        } else {
            store.goToPageView(store.lastPage)
        }
    }

</script>
  
<style scoped>
    .pagination-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .pagination-page-count{
        color: #ecf0f1;
        width: 100%;
        padding-top: 10px;
        text-align: center;
    }
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
  