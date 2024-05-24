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
