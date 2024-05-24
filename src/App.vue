<template>
  <main class="main">
    <Filter></Filter>
    <Card v-if="dataLoaded && store.characters && store.characters.length > 0"></Card>
    <div class="main-empty" v-else-if="dataLoaded && store.characters && store.characters.length === 0">Результатов нет</div>
    <div class="main-empty" v-else>Загрузка...</div>
  </main>
</template>

<script setup lang="ts">
  import { useMortyApi } from './stores/mortyApi';
  import { onMounted, ref, watch } from 'vue';
  import Card from './components/Card.vue';
  import Filter from './components/Filter.vue';

  const store = useMortyApi();
  const dataLoaded = ref(false)
  onMounted(async () => {
    await store.fetchCharacters();
    dataLoaded.value = true
  });
  watch(() => store.currentPage, async() => {
    store.fetchCharacters()
    .then(() => {
      if(store.characters.length<20){
        store.goToPage(1)
      }
    })
  })
</script>

<style lang="scss">
body{
  margin: 0;
}
.main-card-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(39, 43, 51);
}
.main-empty{
  width: 100vw;
  height: 100vh;
  background: rgb(39, 43, 51);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  color: #ecf0f1;
}
.main{
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: min-content;
  justify-items: center;
  justify-content: center;
  min-height: 100vh;
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
