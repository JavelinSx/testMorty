<template>
    <button type="submit" @click="store.fetchCharacters">Применить</button>
</template>
<script setup lang="ts">
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();
</script>
<style lang="scss" scoped>
button[type="submit"] {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff; /* цвет фона кнопки */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3; /* изменение цвета фона при наведении */
}

button[type="submit"]:focus {
  outline: none;
}

button[type="submit"]:disabled {
  background-color: #ccc; /* цвет фона при отключенном состоянии */
  cursor: not-allowed;
}
</style>