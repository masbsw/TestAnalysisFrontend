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
                    v-model="newProjectName"
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
import { ref } from 'vue';
import axios from 'axios';

const showAddProject = ref(false);
const newProjectName = ref('');
const projects = ref([]);

const addProject = async () => {
    if (newProjectName.value.trim()) {
        try {
            const response = await axios.post('http://localhost:8001/create-project', {
                name: newProjectName.value
            });
            const newProject = response.data;
            projects.value.push(newProject);
            newProjectName.value = '';
            showAddProject.value = false;
        } catch (error) {
            console.error('Ошибка при создании проекта:', error);
        }
    }
};
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
