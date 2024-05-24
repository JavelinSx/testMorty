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

<style lang="scss" scoped>
.main{
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  justify-content: center;
  gap: 1rem;
  @media (min-width: 550px) and (max-width: 768px){
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1366px){
    grid-template-columns: auto auto;
  }
  @media (min-width: 1366px) and (max-width: 100vw){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1920px) and (max-width: 100vw){
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
