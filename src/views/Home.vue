<template>
    <div class="h-[125px] bg-[#6765F2] text-white flex flex-col px-4">
      <p class="text-[24px] font-bold mt-7 pl-2">Welcome {{ username }}!</p>
      <p class="text-[16px] pl-2">Stay Organized, get things done!</p>
    </div>
    <div class="flex flex-col items-center justify-center mt-1">
      <SearchBar v-model="searchQuery" />
      <Navbar v-model="selectedCategory" />

    </div>
    <div class="fixed bottom-6 ml-[340px]">
      <AddButton />
    </div>

   <div class="p-4 mt-1">

<!-- If no tasks -->
     <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center mt-12">
       <img :src="emptyImage" alt="Empty tasks" class="w-56 h-56 object-contain" />
        <p class="w-[250px] text-center text-lg text-gray-600 mt-4 font-medium">No tasks yet in this category. Click + to create your task.</p>
     </div>

<!-- If tasks exist -->
     <div v-else>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-complete="handleToggleComplete"
        @edit-task="handleEditTask"
        @delete-task="handleDeleteTask"
      />
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

  
  
  const username = ref('')
  const tasks = ref([])
  const searchQuery = ref('')
  const selectedCategory = ref('All')

  const router = useRouter()

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.value = savedTasks
  }


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


  
  onMounted(() => {
    username.value = localStorage.getItem('username') || 'User'

    // Load tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.value = savedTasks
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
  