<script setup lang="ts">
import { useMortyApi } from './stores/mortyApi';
import { onMounted, ref } from 'vue';
import type { Character } from './types/character';
const store = useMortyApi();
const data = ref<Character[]>()
onMounted(async () => {
  await store.fetchCharacters();
});
data.value = store.characters;

</script>

<template>
  <main>
    <h1>Morty</h1>
    <div v-for="character in data" :key="character.id">
      <h2>{{ character.name }}</h2>
    </div>
  </main>
</template>

<style scoped>

</style>
