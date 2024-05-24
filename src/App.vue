<template>
  <main class="main">
    <Filter></Filter>
    <Card v-if="dataLoaded"></Card>
  </main>
</template>

<script setup lang="ts">
  import { useMortyApi } from './stores/mortyApi';
  import { onMounted, ref } from 'vue';
  import Card from './components/Card.vue';
  import Filter from './components/Filter.vue';

  const store = useMortyApi();
  const dataLoaded = ref(false)
  onMounted(async () => {
    await store.fetchCharacters();
    dataLoaded.value = true
  });

</script>

<style lang="scss">
body{
  margin: 0;
}
.main{
  display: grid;
  grid-template-columns: max-content;
  justify-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgb(39, 43, 51);

  @media (min-width: 1366px) and (max-width: 1920px){
    grid-template-columns: max-content max-content;
  }
  @media (min-width: 1920px) and (max-width: 100vw){
    grid-template-columns: max-content max-content max-content;
  }
}
</style>
