<template>
  <div class="flex-1">
    <div class="p-6">
      <h1 class="text-4xl text-white font-medium mb-6">Мои проекты</h1>

      <button
        @click="showAddProject = true"
        class="btnCase mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left mb-6"
      >
        <h3 class="font-normal text-2xl text-white">+ Добавить новый проект</h3>
      </button>

      <div v-if="showAddProject" class="mb-6 p-4 bg-[#1a102b5b] rounded-lg">
        <input
          v-model="newProject.name"
          type="text"
          placeholder="Введите название проекта"
          class="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="showAddProject = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Отмена
          </button>
          <button
            @click="addProject"
            class="px-4 py-2 bg-[#c0bbbb] text-black rounded hover:bg-[#D6D7E7] transition"
          >
            Создать
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
        <router-link
          v-for="project in projects"
          :key="project.id"
          :to="'/cases/' + project.id"
          class="btnCase mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left"
        >
          <h3 class="font-normal text-2xl text-white">{{ project.name }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const showAddProject = ref(false)
const projects = ref([])
const isLoading = ref(false) // Добавлено состояние загрузки

const newProject = ref({
  name: '',
  description: '',
  githubUrl: '',
  owner: {
    username: '',
  },
})

// Получаем текущего пользователя из localStorage
const currentUser = JSON.parse(localStorage.getItem('user'))

// Загружаем проекты при монтировании компонента
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8081/api/projects', {
      params: {
        page: 0,
        size: 10,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const dataProject = response.data.content
    projects.value = dataProject
  } catch (error) {
    console.error('Ошибка при загрузке проектов:', error)
  }
})

const addProject = async () => {
  // Проверка на пустое имя проекта
  if (!newProject.value.name || !newProject.value.name.trim()) {
    alert('Название проекта обязательно')
    return
  }

  try {
    isLoading.value = true

    // Получаем токен из localStorage
    const token = localStorage.getItem('token')

    // Формируем данные для отправки
    const projectData = {
      name: newProject.value.name, // Используем введенное имя
      description: newProject.value.description || 'описание',
      githubUrl: newProject.value.githubUrl || 'https://github.com/example/project',
      owner: {
        username: currentUser.username,
      },
    }
    console.log('projectdata + ', projectData)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8081/api/projects', {
        params: {
          page: 0,
          size: 10,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      projects.value.push(response.data.content)

      console.log(response.data)
    } catch (error) {
      console.error('Ошибка при загрузке проектов:', error)
    }

    // Добавляем новый проект в список
    console.log(projects.value)

    // Сбрасываем форму
    newProject.value = {
      name: '',
      description: '',
      githubUrl: '',
      owner: {
        username: '',
      },
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8081/api/projects', {
        params: {
          page: 0,
          size: 10,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      projects.value = response.data.content
    } catch (error) {
      console.error('Ошибка при загрузке проектов:', error)
    }

    showAddProject.value = false
  } catch (error) {
    console.error('Ошибка при создании проекта:', error)
    if (error.response?.status === 401) {
      alert('Сессия истекла. Пожалуйста, войдите снова.')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    } else {
      alert(`Не удалось создать проект: ${error.response?.data?.message || error.message}`)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.card {
  background-color: rgba(53, 47, 75, 0.5);
}

.btnCase {
  padding: 15px 20px;
  border: none;
  outline: none;
  color: #eee;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

.btnCase:hover {
  transform: translateY(-3px);
}

input {
  outline: none;
  border: 1px solid #321b5ae8;
}

input:focus {
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
