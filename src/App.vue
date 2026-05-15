<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './utils/supabase'

console.log(supabase)

// const todos = ref([])

// async function getTodos() {
//   const { data } = await supabase.from('todos').select()
//   todos.value = data
// }

// onMounted(() => {
//   getTodos()
// })

</script>

<template>
  <main>
    <RouterView />
    <ul>
      <!-- <li v-for="todo in todos" :key="todo.id">{{ todo.name }}</li> -->
    </ul>
  </main>

</template>
