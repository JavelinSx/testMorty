<template>
    <div class="card" v-for="(item, index) in data" :key="index">
        <img class="card-img" :src="item.image">
        <p class="card-name">{{ item.name }}</p>
        <p class="card-status">{{ item.status }}</p>
    </div>
</template>

<script setup lang="ts">
  import { useMortyApi } from '@/stores/mortyApi';
  import { computed } from 'vue';
  
  const store = useMortyApi();
  const data = computed(() => store.characters);

</script>

<style lang="scss">
.card {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.card-img {
  height: 250px;
  width: 90%;
  object-fit: cover;
  border-radius: 8px;
  margin: 10px;
}

.card-name {
  font-weight: bold;
}

.card-status,
.card-gender {
  margin-top: 8px;
}
</style>
