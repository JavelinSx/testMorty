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
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
    @media (min-width: 650px) and (max-width: 100vw){
        min-width: 600px;
    }
}
.filter-option{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
}
</style>