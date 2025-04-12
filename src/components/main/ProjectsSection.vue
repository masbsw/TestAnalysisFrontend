<template>
    <div class="flex-1">
        <div class="p-6">
            <h1 class="text-4xl text-white font-medium mb-6">Мои проекты</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
            
                <router-link to="/cases" class="btnCase mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left">
                    <h3 class="font-normal text-2xl text-white">Проект</h3>
                </router-link> 
                
                
                <router-link to="/cases" class="btnCase mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left">
                    <h3 class="font-normal text-2xl text-white">Проект</h3>
                </router-link> 
                
                
                <router-link to="/cases" class="btnCase mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left">
                    <h3 class="font-normal text-2xl text-white">Проект</h3>
                </router-link> 
                
                
                <router-link to="/cases" class="btnCase mt-6 card rounded-xl p-4 hover:shadow-md transition-shadow text-left">
                    <h3 class="font-normal text-2xl text-white">Проект</h3>
                </router-link> 
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card{
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
</style>