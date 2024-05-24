<template>
    <div class="select-container">
        <select v-model="selectedValue" @click="handlePlaceHolderHidden" @change="handleChange">
            <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</option>
        </select>
        <span v-if="placeholderVisible" class="select-placeholder">Выберите статус</span>
    </div>

</template>
<script setup lang="ts">
    import { ref, defineProps, defineEmits } from 'vue';
    import type { Select } from '@/types/select';
    import { useMortyApi } from '@/stores/mortyApi';

    const store = useMortyApi();

    const placeholderVisible = ref(true)

    const props = defineProps<{ options: Select[] }>();
    const emits = defineEmits(['update:modelValue']);
    const selectedValue = ref<Select['value'] | null>(null);

    const handlePlaceHolderHidden = () => {
        placeholderVisible.value = false
    }

    const handleChange = (event:Event) => {
        const value = (event.target as HTMLSelectElement).value;
        const selectedOption = props.options.find(option => option.value === value);
        if (selectedOption) {
            selectedValue.value = selectedOption.value;
            emits('update:modelValue', selectedValue.value);
            store.selectedFilter(selectedValue.value)
        }
        placeholderVisible.value = false
    }
</script>
<style lang="scss" scoped>
.select-container{
    position: relative;
    width: 100%;
}
.select-placeholder{
    position: absolute;
    top: 10px;
    left: 10px;
}
select {
    width: 100%;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    transition: border-color 0.3s ease;
}

select:hover {
  border-color: #4CAF50;
}

select:focus {
  outline: none;
  border-color: #4CAF50;
}

select option {
  padding: 8px 12px;
}

select option:hover {
  background-color: #f2f2f2;
}

select option:checked {
  background-color: #4CAF50;
  color: white;
}
</style>
