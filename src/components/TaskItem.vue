<template>
  <div class="bg-white rounded-xl shadow px-4 py-6 mb-5 flex justify-between items-center border border-[#c4c4c4]">
    <!-- Left: Toggle + Info -->
    <div @click="goToDetails" class="flex items-start gap-2 cursor-pointer">
      <!-- ⭕ or ✅ -->
      <div 
        class="mt-1 text-xl" @click.stop="toggleCompleted">
        {{ isCompleted ? '✅' : '⭕' }}
      </div>

      <div>
        <h3 class="text-lg font-semibold" :class="{ 'line-through text-gray-400': task.isCompleted && !isCompletedview }">
          {{ task.title }}
        </h3>
        <p class="text-sm text-gray-600">{{ task.category }} • Due: {{ formatDate(task.deadline) }}</p>
      </div>
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center gap-3">
      <button 
        v-if="!isCompletedview"
        @click.stop="$emit('edit-task', task.id)">
        <PencilSquareIcon class="w-6 h-6 text-[#6366F1]" />
      </button>
      <button @click.stop="$emit('delete-task', task.id)">
        <TrashIcon class="w-6 h-6 text-red-500" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'

const props = defineProps({ task: Object, isCompletedview: Boolean })
const router = useRouter()

const formatDate = (isoString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(isoString).toLocaleDateString(undefined, options)
}

const isCompleted = ref(false)

// load actual task status from localStorage
onMounted(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const current = tasks.find(t => t.id === props.task.id)
  if (current) {
    isCompleted.value = current.isCompleted || false
  }
})

const emit = defineEmits(['update-tasks'])
const toggleCompleted = () => {
  isCompleted.value = !isCompleted.value

  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const index = tasks.findIndex(t => t.id === props.task.id)
  if (index !== -1) {
    tasks[index].isCompleted = isCompleted.value
    localStorage.setItem('tasks', JSON.stringify(tasks))
    emit('update-tasks') // Notify parent to reload tasks
  }
}

const goToDetails = () => {
  router.push(`/task/${props.task.id}`)
}
</script>
