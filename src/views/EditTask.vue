<template>
    <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <div class="w-full h-[125px] bg-[#6765F2] text-white px-6 pt-7">
      <h1 class="font-bold text-[24px] font-poppins">
        Edit Task
      </h1>
      <p class="text-[16px] font-regular">
        Make changes to your task ✏️
      </p>
    </div>

    <div class="flex-grow w-full max-w-md mx-auto mt-6 px-4 space-y-6">

    <!-- Title -->
    <div class="mb-4 mt-6 pl-6">
      <label class="block text-gray-700 mb-4 text-[18px] font-medium">Title</label>
      <input
        type="text"
        v-model="title"
        placeholder="Enter task title"
        class="w-[340px] h-[48px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
      />
    </div>
  
    <!-- Details -->
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
    <div class="mb-4 mt-6 pl-6">
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
          <input
            type="radio"
            :value="option"
            v-model="category"
            class="sr-only peer"
          />
          <div
            class="w-5 h-5 border-2 rounded-sm border-[#C4C4C4] flex items-center justify-center
                   peer-checked:border-[#49D249] peer-checked:bg-[#49D249] transition"
          >
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
          <span>{{ option === 'all' ? 'Other' : option }}</span>
        </label>
      </div>
    </div>
  
    <!-- Buttons -->
    <div class="flex justify-between items-center mt-12 pl-7 pr-7">
      <button
        @click="router.push('/home')"
        class="w-[113px] h-[40px] bg-[#FF0000] text-white text-[16px] font-semibold py-2 rounded-[10px] hover:bg-[#A40202] transition duration-200"
      >
        Cancel
      </button>
      <button
        @click="updateTask()"
        class="w-[92px] h-[40px] bg-[#6765F2] text-white text-[16px] font-semibold py-2 rounded-[10px] hover:bg-[#5553e6] transition duration-200"
      >
        Update
      </button>
    </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  
  const title = ref('')
  const details = ref('')
  const deadline = ref('')
  const category = ref('')
  
  const editingId = ref(null)
  
  onMounted(() => {
    const taskId = route.query.id
    if (taskId) {
      editingId.value = Number(taskId)
      const tasks = JSON.parse(localStorage.getItem('tasks')) || []
      const existing = tasks.find(task => task.id === editingId.value)
  
      if (existing) {
        title.value = existing.title
        details.value = existing.details
        deadline.value = existing.deadline
        category.value = existing.category
      }
    }
  })
  
  
  const updateTask = () => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || []
    const updatedTasks = saved.map(task => {
      if (task.id === editingId.value) {
        return {
          ...task,
          title: title.value,
          details: details.value,
          deadline: deadline.value,
          category: category.value
        }
      }
      return task
    })
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    router.push('/home')
  }
  </script>
  