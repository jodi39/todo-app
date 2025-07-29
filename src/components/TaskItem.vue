
<template>
  <div class="bg-white rounded-xl shadow px-4 py-6 mb-5 flex justify-between items-center border border-[#c4c4c4]">
    <!-- Left side: checkbox + task details -->
    <div class="flex items-start gap-2">
      <button @click="$emit('toggle-complete', task.id)" class="mt-1 text-xl">
        {{ task.isCompleted ? '✅' : '⭕' }}
      </button>
      <div>
        <h3 class="text-lg font-semibold" :class="{ 'line-through text-gray-400': task.isCompleted }">
          {{ task.title }}
        </h3>
        <p class="text-sm text-gray-600">{{ task.category }} • Due: {{ task.deadline }}</p>
      </div>
    </div>

    <!-- Right side: edit + delete icons -->
    <div class="flex items-center gap-3">
      <button @click="$emit('edit-task', task.id)">
        <PencilSquareIcon class="w-6 h-6 text-[#6366F1]" />
      </button>
      <button @click="$emit('delete-task', task.id)">
        <TrashIcon class="w-6 h-6 text-red-500" />
      </button>
    </div>
  </div>
</template>


<script setup>
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'

defineProps({ task: Object })
defineEmits(['toggle-complete', 'edit-task', 'delete-task'])
</script>

