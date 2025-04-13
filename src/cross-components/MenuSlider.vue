<template>
  <div class="container w-[25%] rounded-lg shadow-md p-4 mr-8 flex items-center">
    <nav>
      <ul class="space-y-12">
        <router-link to="/" class="block px-4 py-2">
          <li>
            <a class="text-white font-normal text-3xl">Главная</a>
          </li>
        </router-link>

        <transition name="slide-fade">
          <router-link 
            v-if="showTestingButton"
            :to="'/testing'" 
            class="block px-4 py-2"
          >
            <li>
              <a class="text-white font-normal text-3xl">Создать тест-кейс</a>
            </li>
          </router-link>
        </transition>

        <transition name="slide-fade">
          <router-link 
            v-if="showSettingsButton"
            :to="'/settings'" 
            class="block px-4 py-2"
          >
            <li>
              <a class="text-white font-normal text-3xl">Настройки</a>
            </li>
          </router-link>
        </transition>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const showTestingButton = ref(false)
const showSettingsButton = ref(false)


watch(() => route.path, (newPath) => {
  showTestingButton.value = newPath.startsWith('/cases') || newPath.startsWith('/testing') || newPath.startsWith('/testInfo')
  showSettingsButton.value = newPath !== '/'

}, { immediate: true }) 
</script>

<style scoped>
.container {
  background-color: rgb(28, 26, 59, 1);
}


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>

