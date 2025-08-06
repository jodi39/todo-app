<template>
  <!-- Header -->
  <div class="h-[244px] bg-[#6765F2] text-white flex flex-col items-center justify-center text-center">
    <h1 class="text-2xl sm:text-4xl font-bold leading-tight font-poppins">
      Welcome to To-do List
    </h1>
    <p class="text-base sm:text-lg font-semibold mt-2">
      Organize your life. One task at a time
    </p>
  </div>

  <!-- Image Section -->
  <div class="flex items-center justify-center">
    <img :src="todoImage" alt="Todo Illustration" class="h-full max-w-full h-auto object-contain" />
  </div>

  <!-- Description -->
  <div class="flex items-center justify-center mt-6 text-base sm:text-lg font-medium text-[#333333] font-inter text-center px-4">
    <p>Create tasks quickly and easily.</p>
  </div>

  <!-- Input and Button -->
  <div class="w-full flex flex-col items-center justify-center px-4">
    <input
      type="text"
      placeholder="Enter your name" 
      v-model="name"
      class="w-full max-w-md h-12 mb-6 p-2 border border-[#333333B2] rounded-[7px] mt-6 text-sm text-[rgba(51, 51, 51, 0.7)] pl-4"
    />
    <button
      @click="goToHome"
      class="w-full max-w-md h-10 bg-[#4842F1] text-white font-semibold text-base py-2 rounded-[20px] hover:bg-indigo-800 transition font-inter"
    >
      Continue
    </button>
  </div>
</template>

  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const todoImage = new URL('@/assets/images/todo_img.png', import.meta.url).href
  

  const name = ref('')
  const router = useRouter()
  
  const goToHome = () => {
    if (name.value.trim()) {
      localStorage.setItem('username', name.value)
      router.push('/home')
    } else {
      alert('Please enter your name')
    }
  }
  </script>


<style scoped>

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}


</style>

  