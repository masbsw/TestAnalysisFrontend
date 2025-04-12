<template>
    <div class="container  w-[25%] rounded-lg shadow-md p-4 mr-8 flex items-center">
    <nav>
      <ul class="space-y-12">
        <router-link to="/" class="block px-4 py-2"><li>
          <a href="#" class=" text-white font-normal text-3xl hover:"
            >Главная</a
          >
        </li></router-link>

        <router-link to="/testing" class="block px-4 py-2">
          <li>
          <a href="#" class=" text-white font-normal text-3xl"
            >Тестирование</a
          >
          </li>
        </router-link>

        <li>
          <a href="#" class="block px-4 py-2 text-white font-normal text-3xl">Настройки</a>
        </li>
      </ul>
    </nav>
  </div>

</template>

<style scoped>

 .container{
  background-color: rgb(28, 26, 59, 1);
}

</style>
