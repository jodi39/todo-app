<template>
    <div class="relative w-full max-w-[340px] mb-1 mt-6 ">
      <!-- Search Icon -->
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
  
      <!-- Input Field -->
      <input
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-[340px] h-[48px] pl-10 pr-4 py-2 border border-gray-300 rounded-[7px] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: String,
    placeholder: {
      type: String,
      default: 'Search tasks...'
    }
  })
  </script>
  