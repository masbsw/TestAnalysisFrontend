<template>
  <div class="flex-1">
    <div class="p-6">
      <h1 class="text-4xl text-white font-medium mb-6">Тест-кейсы</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link
          v-for="(testCase, index) in testCases"
          :key="index"
          :to="'/test-info/' + index"
          class="mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left"
        >
          <h3 class="font-normal text-2xl text-white">Тест-кейс №{{ index + 1 }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const testCases = ref([])
const route = useRoute()

const fetchTestCases = async () => {
  const token = localStorage.getItem('token')
  try {
    const projectId = route.params.id // Извлекаем ID из URL
    const response = await axios.get(`http://localhost:8081/api/tests/project/${projectId}`, {
      params: {
        page: 0,
        size: 10,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    testCases.value = response.data.content
    console.log(response.data.content)
  } catch (error) {
    console.error('Ошибка при получении тест-кейсов:', error)
  }
}

onMounted(() => {
  fetchTestCases()
})
</script>

<style scoped>
.card {
  background-color: rgba(53, 47, 75, 0.5);
}

button {
  padding: 15px 20px;
  border: none;
  outline: none;
  background-color: #151515;
  color: #eee;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

button:hover {
  transform: translateY(-3px);
}
</style>
