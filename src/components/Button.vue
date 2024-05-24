<template>
    <button type="submit" @click="store.fetchCharacters">Применить</button>
</template>
<script setup lang="ts">
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();
</script>
