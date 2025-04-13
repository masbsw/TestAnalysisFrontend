<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto px-4 py-6 flex flex-1">
      <div class="w-full max-w-xl mx-auto my-auto">
        <div class="bg-[#28264F] rounded-2xl shadow-lg p-8">
          <p class="font-normal text-white text-center my-8">
            Хотите сохранить прогресс? Зарегистрируйтесь!
          </p>
          <h2 class="text-4xl text-white font-medium mb-12 text-center">Регистрация</h2>

          <div v-if="error" class="mb-6 p-3 bg-red-500/20 text-red-300 rounded-lg text-center">
            {{ error }}
          </div>

          <form @submit.prevent="handleSubmit" class="flex flex-col items-center space-y-8">
            <div class="w-[80%]">
              <input
                v-model="form.username"
                type="text"
                required
                class="w-full px-0 py-2 bg-[#28264F] border-0 border-b-2 border-[#ffffff50] text-white text-left font-light focus:outline-none focus:border-[#c0bbbb] focus:ring-0 transition-colors"
                placeholder="Логин"
              />
            </div>

            <div class="w-[80%]">
              <input
                v-model="form.password"
                type="password"
                required
                minlength="6"
                class="w-full px-0 py-2 bg-[#28264F] border-0 border-b-2 mb-9 border-[#ffffff50] text-white text-left font-light focus:outline-none focus:border-[#c0bbbb] focus:ring-0 transition-colors"
                placeholder="Пароль"
              />
            </div>

            <button
              type="submit"
              class="w-[40%] py-3 px-4 bg-[#5E5B6B] hover:bg-[#74727c] text-white font-light rounded-lg transition duration-200"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Зарегистрироваться</span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Обработка...
              </span>
            </button>

            <div class="text-center text-gray-400 text-sm mt-6">
              Уже есть аккаунт?
              <router-link to="/signin" class="text-[#c0bbbb] hover:text-[#D6D7E7] ml-1"
                >Войти</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
  role: 'user',
})

const isLoading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  // Валидация
  if (!form.value.username.trim() || !form.value.password.trim()) {
    error.value = 'Заполните все поля'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Пароль должен быть больше 6 символов'
    return
  }

  isLoading.value = true

  try {
    const response = await axios.post('http://localhost:8001/signup', {
      username: form.value.username,
      password: form.value.password,
      role: form.value.role,
    })

    console.log('Успешная регистрация', response.data)

    localStorage.setItem('userId', response.data.id)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    router.push('/signin')
  } catch (err) {
    console.error('Ошибка регистрации', err)
    error.value = 'Произошла ошибка при регистрации'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
input {
  color: white !important;
  caret-color: white;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

input::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
