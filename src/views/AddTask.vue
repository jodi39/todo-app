<template>
    <!-- <div class="min-h-screen bg-white px-6 pt-6 pb-20 "> -->
      <!-- Header -->
      <div class="h-[125px] bg-[#6765F2] text-white pl-6 pt-7">
      <h1 class="font-bold text-[24px] font-poppins">Add New Task</h1>
      <p class="text-[16px] font-regular">Every task you add is progress 💪</p>
      </div>
  
      <!-- Task Title -->
      <div class="mb-4 mt-6 pl-6">
        <label class="block text-gray-700 mb-4 text-[18px] font-medium">Title</label>
        <input
          type="text"
          v-model="title"
          placeholder="Enter task title"
          class="w-[340px] h-[48px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
        />
      </div>
  
      <!-- Task Details -->
      <div class="mb-4 mt-6 pl-6">
        <label class="block text-gray-700 mb-4 text-[18px] font-medium">Details</label>
        <textarea
          v-model="details"
          rows="4"
          placeholder="Write details here..."
          class="w-[340px] h-[120px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
        ></textarea>
      </div>
  
      <!-- Deadline -->
      <div class="mb-4 mt-6 pl-6 ">
        <label class="block text-gray-700 mb-4 text-[18px] font-medium">Deadline</label>
        <input
          type="date"
          v-model="deadline"
          class="w-[340px] h-[48px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
        />
      </div>
  
      <!-- Category -->
      
      <div class="mb-4 mt-6 pl-6">
  <label class="block text-gray-700 mb-4 text-[18px] font-medium">Category</label>
  <div class="flex flex-col gap-3">
    <label
      v-for="option in ['Work', 'Personal', 'all']"
      :key="option"
      class="flex items-center gap-3 cursor-pointer pl-6"
    >
      <!-- Hidden native radio -->
      <input
        type="radio"
        :value="option"
        v-model="category"
        class="sr-only peer"
      />

      <!-- Custom square with check -->
      <div
        class="w-5 h-5 border-2 rounded-sm border-[#C4C4C4] flex items-center justify-center
               peer-checked:border-[#49D249] peer-checked:bg-[#49D249] transition"
      >
        <!-- Checkmark -->
        <svg
          v-if="category === option"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Label text -->
      <span>{{ option === 'all' ? 'Other' : option }}</span>
    </label>
  </div>
</div>


     
   <div class="flex justify-between items-center mt-12 pl-7 pr-7">
  <!-- Cancel Button (left) -->
  <button
    @click="router.push('/home')"
    class="w-[113px] h-[40px] bg-[#FF0000] text-white text-[16px] font-semibold py-2 rounded-[10px] hover:bg-[#A40202] transition duration-200"
  >
    Cancel
  </button>

  <!-- Save Button (right) -->
  <button
    @click="addTask"
    class="w-[92px] h-[40px] bg-[#6765F2] text-white text-[16px] font-semibold py-2 rounded-[10px] hover:bg-[#5553e6] transition duration-200"
  >
    Save
  </button>
</div>


  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const title = ref('')
  const details = ref('')
  const deadline = ref('')
  const category = ref('')
  
  const router = useRouter()
  
  const addTask = () => {
    if (!title.value || !details.value || !deadline.value || !category.value) {
      alert('Please fill in all fields')
      return
    }
  
    const newTask = {
      id: Date.now(),
      title: title.value,
      details: details.value,
      deadline: deadline.value,
      category: category.value,
      completed: false
    }
  
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('tasks')) || []
    saved.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(saved))
  
    // Redirect to Home
    router.push('/home')
  }
  </script>



  