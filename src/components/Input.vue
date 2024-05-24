<template>
    <input type="text" @change="updateText" v-model="inputText">
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();
    const inputText = ref('')

    const updateText = () => {
        store.nameFilter = inputText.value
    }
</script>
<style lang="scss" scoped>
input[type="text"] {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input[type="text"]:hover {
  border-color: #4CAF50; /* зеленая рамка при наведении */
}

input[type="text"]:focus {
  outline: none;
  border-color: #4CAF50; /* зеленая рамка при фокусе */
}
</style>