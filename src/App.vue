<template>
  <main class="main">
    <Filter></Filter >
    <div class="main-card-container" >
      <Card v-if="dataLoaded && store.characters && store.characters.length > 0"></Card>
      <div class="main-empty" v-else-if="dataLoaded && store.characters && store.characters.length === 0">Результатов нет</div>
      <div class="main-empty" v-else>Загрузка...</div>
    </div>

  </main>
</template>

<script setup lang="ts">
  import { useMortyApi } from './stores/mortyApi';
  import { onMounted, ref} from 'vue';
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

.main-card-container{
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1920px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
