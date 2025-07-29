<template>
    <button
      @click="goToAdd"
      class="fixed bottom-6 w-14 h-14 bg-[#4842F1] text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center justify-center text-[40px] leading-none"
    >
      +
    </button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goToAdd = () => {
    router.push('/AddTask')
  }
  </script>
  