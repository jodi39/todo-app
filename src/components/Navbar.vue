<template>
    <div class="flex gap-3 mt-4 overflow-x-auto px-4">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          'px-4 py-1 text-[14px] font-medium',
          selected === category
            ? 'bg-[#6765F2] text-white rounded-[20px] font-bold'
            : 'border border-[#333] text-gray-700 rounded-[10px]'
        ]"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: String,
  })
  const emit = defineEmits(['update:modelValue'])
  
  const selected = ref(props.modelValue || 'All')
  const categories = ['All', 'Work', 'Personal', 'Completed']
  
  watch(() => props.modelValue, (newVal) => {
    selected.value = newVal
  })
  
  const selectCategory = (category) => {
    selected.value = category
    emit('update:modelValue', category)
  }
  </script>
  