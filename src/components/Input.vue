<template>
    <input type="text" v-model="store.nameFilter" placeholder="Имя персоонажа" @keydown.enter="store.fetchCharacters()">
</template>
<script setup lang="ts">
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();

</script>
<style lang="scss" scoped>
input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;
}

input[type="text"]:hover {
  border-color: #4CAF50;
}

input[type="text"]:focus {
  outline: none;
  border-color: #4CAF50; 
}
</style>