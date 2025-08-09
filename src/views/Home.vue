<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <div class="h-[125px] bg-[#6765F2] text-white flex flex-col px-4">
      <p class="text-xl sm:text-2xl font-bold mt-7 pl-2">Welcome {{ username }}!</p>
      <p class="text-base sm:text-lg pl-2">Stay Organized, get things done!</p>
    </div>


    <!-- Main Content -->
    <div class="flex flex-col items-center justify-center mt-1">
      <SearchBar v-model="searchQuery" />
      <Navbar v-model="selectedCategory" />

      <div v-if="selectedCategory === 'Completed'" class="text-center mt-4 text-[#333] font-medium px-4">
        check ✅ — progress feels good, right? <br />
        Great job! Keep the momentum going.
      </div>
      

      <!-- Tasks Section -->
      <div class="w-full max-w-4xl mx-auto mt-4 px-4 sm:px-8">
        <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center mt-12">
          <img :src="emptyImage" alt="Empty tasks" class="w-40 sm:w-56 object-contain" />
          <p class="w-[250px] text-center text-lg text-gray-600 mt-4 font-medium">
            No tasks yet in this category. Click + to create your task.
          </p>
        </div>

        <div v-else>
          <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            :isCompletedview="selectedCategory === 'Completed'"
            @toggle-complete="handleToggleComplete"
            @edit-task="handleEditTask"
            @delete-task="handleDeleteTask"
            @update-tasks="loadTasks"
          />
        </div>
      </div>
    </div>

    <!-- Add Button at bottom, inside layout -->
    <div class="flex justify-end px-4 sm:pr-6 pb-6">
      <AddButton />
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted, watch, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import SearchBar from '@/components/SearchBar.vue'
  import Navbar from '@/components/Navbar.vue'
  import AddButton from '@/components/AddButton.vue'
  import TaskItem from '@/components/TaskItem.vue'

  const emptyImage = new URL('@/assets/images/empty_state.png', import.meta.url).href

  
  
  const username = ref(localStorage.getItem('username') || 'User')
  const tasks = ref([])
  const searchQuery = ref('')
  const selectedCategory = ref('All')

  const router = useRouter()

  // Load tasks from localStorage
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.value = savedTasks
  }


  // Load when component mounts
  onMounted(() => {
    loadTasks()
  })

// Computed: Filter tasks by search and category
  const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === 'All' ||
      (selectedCategory.value === 'Completed' && task.isCompleted) ||
      (selectedCategory.value !== 'Completed' && task.category === selectedCategory.value)

    return matchesSearch && matchesCategory
  })
})


  
  watch(router, () => {
    loadTasks()
  })

  function handleToggleComplete(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.isCompleted = !task.isCompleted
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }
   }

  function handleEditTask(id) {

    router.push(`/EditTask?id=${id}`)
    
  }

  function handleDeleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    
  }
  </script>
  