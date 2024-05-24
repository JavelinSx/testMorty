<template>
    <select v-model="selectedValue" @change="handleChange">
        <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</option>
    </select>
</template>
<script setup lang="ts">
    import { ref, defineProps, defineEmits } from 'vue';
    import type { Select } from '@/types/select';
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();

    const props = defineProps<{ options: Select[] }>();
    const emits = defineEmits(['update:modelValue']);
    const selectedValue = ref<Select['value'] | null>(null);

    const handleChange = (event:Event) => {
        const value = (event.target as HTMLSelectElement).value;
        const selectedOption = props.options.find(option => option.value === value);
        if (selectedOption) {
            selectedValue.value = selectedOption.value;
            emits('update:modelValue', selectedValue.value);
            store.selectedFilter(selectedValue.value)
        }
    }
</script>
