<template>
  <div class="flex-1">
    <div class="p-6">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl text-white font-medium">Настройки проекта</h1>
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-[#16143368] text-white rounded-lg hover:bg-[#161433c7] transition"
        >
          Удалить проект
        </button>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl text-white mb-4">Название проекта</h2>
        <div class="flex items-center gap-4">
          <input
            v-model="project.name"
            type="text"
            class="w-[50%] p-3 bg-[#28264F] border border-[#ffffff30] text-white rounded-lg"
          />
          <button
            @click="saveProjectName"
            class="px-4 py-3 bg-[#5E5B6B] hover:bg-[#74727c] text-white rounded-lg transition"
          >
            Сохранить
          </button>
        </div>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl text-white mb-4">Ссылка на репозиторий</h2>
        <div class="flex items-center gap-4">
          <input
            v-model="project.repository"
            type="url"
            placeholder="https://github.com/username/repository"
            class="w-[50%] p-3 bg-[#28264F] border border-[#ffffff30] text-white rounded-lg"
          />
          <button
            @click="saveRepository"
            class="px-4 py-3 bg-[#5E5B6B] hover:bg-[#74727c] text-white rounded-lg transition"
          >
            Сохранить
          </button>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl text-white">Участники проекта</h2>
          <button
            @click="showAddMember = true"
            class="px-4 py-2 bg-[#5E5B6B] hover:bg-[#74727c] text-white rounded-lg transition"
          >
            + Добавить участника
          </button>
        </div>

        <div v-if="showAddMember" class="mb-6 p-4 bg-[#1a102b5b] rounded-lg">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <input
              v-model="newMember.name"
              type="text"
              placeholder="Имя участника"
              class="p-2 bg-[#28264F] border border-[#ffffff30] text-white rounded"
            />
            <input
              v-model="newMember.role"
              type="text"
              placeholder="Роль"
              class="p-2 bg-[#28264F] border border-[#ffffff30] text-white rounded"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showAddMember = false"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Отмена
            </button>
            <button
              @click="addMember"
              class="px-4 py-2 bg-[#c0bbbb] text-black rounded hover:bg-[#D6D7E7] transition"
            >
              Добавить
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-[#28264F]">
                <th class="p-3 text-left text-white font-normal">Имя</th>
                <th class="p-3 text-left text-white font-normal">Роль</th>
                <th class="p-3 text-right text-white font-normal">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(member, index) in project.members"
                :key="index"
                class="border-b border-[#ffffff10] hover:bg-[#ffffff05]"
              >
                <td class="p-3 text-white">
                  <input
                    v-model="member.name"
                    type="text"
                    class="w-full p-2 bg-transparent border-b border-[#ffffff30] focus:border-[#c0bbbb] focus:outline-none"
                  />
                </td>
                <td class="p-3 text-white">
                  <input
                    v-model="member.role"
                    type="text"
                    class="w-full p-2 bg-transparent border-b border-[#ffffff30] focus:border-[#c0bbbb] focus:outline-none"
                  />
                </td>
                <td class="p-3 text-right">
                  <button
                    @click="removeMember(index)"
                    class="text-[#ffffff30] hover:text-[#ffffff8c] p-1"
                    title="Удалить"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-[#28264F] p-6 rounded-lg max-w-md w-full">
        <h3 class="text-2xl text-white mb-4">Удалить проект?</h3>
        <p class="text-gray-300 mb-6">
          Вы уверены, что хотите удалить этот проект? Это действие нельзя отменить.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteConfirm = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Отмена
          </button>
          <button
            @click="deleteProject"
            class="px-4 py-2 bg-[#161433] text-white rounded hover:bg-[#0c0b1d] transition"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const projectId = route.params.id

const project = ref({
  id: projectId,
  name: '',
  repository: '',
  members: [],
})

const showAddMember = ref(false)
const newMember = ref({
  name: '',
  role: '',
})
const showDeleteConfirm = ref(false)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`http://localhost:8001/projects/${projectId}`)
    project.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке проекта:', error)
  } finally {
    isLoading.value = false
  }
})

const addMember = async () => {
  if (newMember.value.name.trim() && newMember.value.role.trim()) {
    try {
      const response = await axios.post(
        `http://localhost:8001/api/projects/1/members/2`,
        newMember.value,
      )

      project.value.members.push(response.data)
      newMember.value = { name: '', role: '' }
      showAddMember.value = false
    } catch (error) {
      console.error('Ошибка при добавлении участника:', error)
    }
  }
}

const removeMember = async (index) => {
  const memberId = project.value.members[index].id
  try {
    await axios.delete(`http://localhost:8001/projects/${projectId}/members/${memberId}`)
    project.value.members.splice(index, 1)
  } catch (error) {
    console.error('Ошибка при удалении участника:', error)
  }
}

const confirmDelete = () => {
  showDeleteConfirm.value = true
}

const deleteProject = async () => {
  try {
    await axios.delete(`http://localhost:8001/projects/${projectId}`)
    router.push('/projects')
  } catch (error) {
    console.error('Ошибка при удалении проекта:', error)
  } finally {
    showDeleteConfirm.value = false
  }
}

const saveProjectName = async () => {
  try {
    await axios.patch(`http://localhost:8001/projects/${projectId}`, { name: project.value.name })
    console.log('Название проекта сохранено')
  } catch (error) {
    console.error('Ошибка при сохранении названия:', error)
  }
}

const saveRepository = async () => {
  try {
    await axios.patch(`http://localhost:8001/projects/${projectId}`, {
      repository: project.value.repository,
    })
    console.log('Ссылка на репозиторий сохранена')
  } catch (error) {
    console.error('Ошибка при сохранении репозитория:', error)
  }
}
</script>

<style scoped>
table {
  border-spacing: 0;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
}

input[type='text'],
input[type='url'] {
  outline: none;
  transition: border-color 0.2s;
}

input[type='text']:focus,
input[type='url']:focus {
  border-color: #c0bbbb;
}
</style>
