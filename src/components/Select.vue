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
<style lang="scss" scoped>
select {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

select:hover {
  border-color: #4CAF50; /* зеленая рамка при наведении */
}

select:focus {
  outline: none;
  border-color: #4CAF50; /* зеленая рамка при фокусе */
}

select option {
  padding: 8px 12px;
}

select option:hover {
  background-color: #f2f2f2; /* серый фон при наведении на опцию */
}

select option:checked {
  background-color: #4CAF50; /* зеленый фон для выбранной опции */
  color: white;
}
</style>
