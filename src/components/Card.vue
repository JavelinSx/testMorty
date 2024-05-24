<template>
    <div class="card" v-for="(item, index) in store.characters" :key="index">
      <div class="card-img-container">
        <img class="character-image" :src="item.image" :alt="item.name">
      </div>

      <div class="card-info">
        <div class="card-header">
          <div :class="`status-dot ${item.status.toLowerCase()}`"></div>
          <div class="character-name">{{ item.name }}</div>
        </div>
        <div class="character-info">
          <div class="info-item">
            <span class="label">Status:</span> {{ item.status }}
          </div>
        </div>
      </div>

    </div>
</template>

<script setup lang="ts">
  import { useMortyApi } from '@/stores/mortyApi';
  import { computed, watch } from 'vue';

  const store = useMortyApi();




</script>

<style lang="scss">
$alive-color: #2ecc71;
$dead-color: #e74c3c;
$unknown-color: #f39c12;

.card {
  @media (max-width: 640px){
    flex-direction: column;
    height: initial;
    width: 80%;
  }
  width: 530px;
  height: 220px;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  display: flex;
  flex-direction: column;
  color: #ecf0f1;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0;
  }
  .card-info{
    flex: 3 1 0%;
    position: relative;
    padding: 0.75rem;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
  }
  .card-img-container{
    flex: 2 1 0%;
    width: 100%;
  }
  .character-image {
    @media (max-width: 640px){
      height: 300px;
    }
    width: 100%;
    height: 100%;
    margin: 0px;
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    object-position: center center;
    object-fit: cover;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
      padding: 20px;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .status-dot {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      margin-right: 10px;

      &.alive {
        background-color: $alive-color;
      }

      &.dead {
        background-color: $dead-color;
      }

      &.unknown {
        background-color: $unknown-color;
      }
    }

    .character-name {
      font-size: 1em;
      font-weight: bold;
    }
  }

  .character-info {
    text-align: left;

    .info-item {
      margin-bottom: 10px;

      .label {
        font-weight: bold;
      }
    }
  }
}
</style>
