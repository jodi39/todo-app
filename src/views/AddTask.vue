<template>
  <div class="min-h-screen bg-white flex flex-col items-center">
    
    <!-- Header -->
    <div class="w-full h-[125px] bg-[#6765F2] text-white px-6 pt-7">
      <h1 class="font-bold text-[24px] font-poppins">Add New Task</h1>
      <p class="text-[16px]">Every task you add is progress 💪</p>
    </div>

    <!-- Form Container -->
    <div class="flex-grow w-full max-w-md mx-auto mt-6 px-4 py-3 sm:px-6 sm:py-8 space-y-6">
      
      <!-- Title -->
      <div>
        <label class="block text-gray-700 mb-2 text-base sm:text-lg md:text-xl font-medium">Title</label>
        <input
          type="text"
          v-model="title"
          required
          placeholder="Enter task title"
          class="w-full h-12 sm:h-14 md:h-16 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <!-- Details -->
      <div>
        <label class="block text-gray-700 mb-2 text-base sm:text-lg md:text-xl font-medium">Details</label>
        <textarea
          v-model="details"
          required
          rows="4"
          placeholder="Write details here..."
          class="w-full h-30 sm:h-32 md:h-40 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
        ></textarea>
        <p v-if="errors.details" class="text-red-500 text-sm mt-1">{{ errors.details }}</p>
      </div>

      <!-- Deadline -->
      <div>
        <label class="block text-gray-700 mb-2 text-base sm:text-lg md:text-xl font-medium">Deadline</label>
        <input
          type="date"
          v-model="deadline"
          required
          class="w-full h-12 sm:h-14 md:h-16 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6765F2]"
        />
        <p v-if="errors.deadline" class="text-red-500 text-sm mt-1">{{ errors.deadline }}</p>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-gray-700 mb-2 text-base sm:text-lg md:text-xl font-medium">Category</label>
        <div class="flex flex-col gap-3">
          <label
            v-for="option in ['Work', 'Personal', 'all']"
            :key="option"
            class="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              :value="option"
              v-model="category"
              required
              class="sr-only peer"
            />
            <div
              class="w-5 h-5 border-2 rounded-sm border-[#C4C4C4] flex items-center justify-center peer-checked:border-[#49D249] peer-checked:bg-[#49D249] transition"
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
        <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
      </div>

      <!-- Buttons -->
      <div class="flex flex-row sm:flex-row justify-between items-center mt-8 mb-6  gap-3">
        <button
  @click="router.push('/home')"
  class="min-w-[90px] sm:min-w-[113px] h-[40px] bg-[#FF0000] text-white text-[16px] font-semibold py-2 rounded-[10px] hover:bg-[#A40202] transition duration-200"
>
  Cancel
</button>
<button
  @click="addTask"
  class="min-w-[75px] sm:min-w-[92px] h-[40px] bg-[#6765F2] text-white text-[16px] font-semibold py-2 rounded-[10px] hover:bg-[#5553e6] transition duration-200"
>
  Save
</button>

      </div>
    </div>
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
  
  // Error tracking
const errors = ref({
  title: '',
  details: '',
  deadline: '',
  category: ''
})

const addTask = () => {
  // Reset all errors
  errors.value = {
    title: '',
    details: '',
    deadline: '',
    category: ''
  }

  // Check each field
  if (!title.value) errors.value.title = 'Title is required!'
  if (!details.value) errors.value.details = 'Details are required!'
  if (!deadline.value) errors.value.deadline = 'Deadline is required!'
  if (!category.value) errors.value.category = 'Category is required!'

  // Stop if any errors
  if (Object.values(errors.value).some(error => error)) return

  // to save the task goes here
  console.log('Task saved!')
  

    const newTask = {
  id: Date.now(),
  title: title.value,
  details: details.value,
  deadline: deadline.value,
  category: category.value,
  completed: false,
  createdAt: new Date().toISOString()
}

  
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('tasks')) || []
    saved.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(saved))
  
    // Redirect to Home
    router.push('/home')
  }
  </script>



  