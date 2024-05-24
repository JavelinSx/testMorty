<template>
    <div class="filter">
        <div class="filter-option">
            <Select :options="store.status"/>
            <Input/>
            <Button/>
        </div>
        <Pagination/>
    </div>

</template>
<script setup lang="ts">
    import { useMortyApi } from '@/stores/mortyApi';
    import Select from './Select.vue';
    import Input from './Input.vue';
    import Button from './Button.vue'
    import Pagination from './Pagination.vue';

    const store = useMortyApi();

</script>
<style lang="scss">
.filter{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    grid-column-start: 1;
    grid-column-end: 2;
    gap: 20px;
    @media (min-width: 550px) and (max-width: 768px){
        grid-column-start: 1;
        grid-column-end: 3;
    }
    @media (min-width: 768px) and (max-width: 1366px){
        grid-column-start: 1;
        grid-column-end: 3;
    }
    @media (min-width: 1366px) and (max-width: 1920px){
        grid-column-start: 1;
        grid-column-end: 5;
    }
    @media (min-width: 1920px) and (max-width: 100vw){
        grid-column-start: 1;
        grid-column-end: 6;
    }
}
.filter-option{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
</style>