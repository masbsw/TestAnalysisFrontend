<template>
    <header>
        <div class="container mx-auto px-4 py-3 flex justify-end">
          <div class="space-x-5">
            <router-link to="/signin" class="button text-white text-2xl font-normal hover:font-medium">Вход</router-link>
            <router-link to="/signup" class="button text-white text-2xl font-normal hover:font-medium">Регистрация</router-link>
          </div>
        </div>
    </header>
</template>

<style scoped>
      .button {
        transition: all 0.5s ease-out;
        border: none;
      }

      .button:hover {
        transform: translateY(-2px);
      }
</style>