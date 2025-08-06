<template>
    <div class="min-h-screen bg-white flex flex-col">
      <!-- Top Bar -->
      <div class="bg-[#7B61FF] h-[125px] text-white flex items-center justify-between px-5 py-3">
        <div class="flex items-center gap-4">
        <button @click="router.back()" class="text-white text-lg font-semibold flex items-center">
            <ArrowLeftIcon class="w-7 h-7 text-white cursor-pointer" />
        </button>
        <h1 class="font-bold text-[24px] font-poppins ">
           Task Details
          </h1>
        </div>

        <div class="flex items-center gap-4">
          <button @click="editTask">
            <PencilSquareIcon class="w-6 h-6 text-[#fff] cursor-pointer" />
          </button>
          <button @click="deleteTask">
            <TrashIcon class="w-6 h-6 text-red-500 cursor-pointer" />
          </button>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="px-10 py-4 flex-1 flex flex-col">
        <div v-if="task">
          <h2 class="text-[24px] font-bold text-[#333] mt-5 mb-4">{{ task.title }}</h2>
          <p class="text-[16px] font-medium text-[#333] mb-4">{{ task.details }}</p>
  
          <div class="border border-[#c4c4c4] rounded-[10px] py-2 mt-6 text-[18px] text-gray-700 space-y-2">
            <div class="px-4 flex justify-between py-2">
              <span>Created</span>
              <span>{{ formatDate(task.createdAt) }}</span>
            </div>
            <hr class="border-[#C4C4C4]">
            <div class="px-4 flex justify-between py-2">
              <span>Deadline</span>
              <span>{{ formatDate(task.deadline) }}</span>
            </div>
            <hr class="border-[#C4C4C4]">
            <div class="px-4 flex justify-between py-2">
              <span>Category</span>
              <span>{{ task.category }}</span>
            </div>
          </div>
  
          <button
            @click="markAsCompleted"
            class="mt-12 bg-green-600 text-white py-2 px-6 rounded-md mx-auto block font-medium"
          >
            Completed
          </button>
        </div>
  
        <div v-else class="text-center text-gray-500 mt-10">
          <p>Task not found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { PencilSquareIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'
  
  const route = useRoute()
  const router = useRouter()
  const task = ref(null)
  
  onMounted(() => {
    const taskId = route.params.id
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    task.value = tasks.find(t => t.id == taskId)
  })
  
  const markAsCompleted = () => {
    task.value.isCompleted = true
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const index = tasks.findIndex(t => t.id == task.value.id)
    if (index !== -1) {
      tasks[index] = task.value
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  
    router.push({ path: '/home', query: { tab: 'completed' } })

  }
  
  function editTask(id) {

router.push(`/EditTask?id=${id}`)

}
  
  const deleteTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const updated = tasks.filter(t => t.id !== task.value.id)
    localStorage.setItem('tasks', JSON.stringify(updated))
    router.push('/home')
  }


const formatDate = (isoString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(isoString).toLocaleDateString(undefined, options)

}



  </script>
  