<template>
    <header>
        <div class="container mx-auto px-4 py-3 flex justify-end">
          <div class="space-x-5">
            <button class="text-white text-2xl font-normal hover:font-medium">Вход</button>
            <button class="text-white text-2xl font-normal hover:font-medium">Регистрация</button>
          </div>
        </div>
    </header>
</template>

<style scoped>
      button {
        transition: all 0.5s ease-out;
        border: none;
      }

      button:hover {
        transform: translateY(-2px);
      }
</style>