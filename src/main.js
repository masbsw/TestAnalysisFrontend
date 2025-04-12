import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,  createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage.vue'
import TestCasePage from './pages/TestCasePage.vue'
import TestingPage from './pages/TestingPage.vue'


const router = createRouter({
    history: createWebHistory(),
    routes:[{
        name: 'Main',
        path: '/',
        component:MainPage
    },
    {
        name: 'Cases',
        path: '/cases',
        component: TestCasePage
    },
    {
        name:'Testing',
        path: '/testing',
        component: TestingPage
    }]
    
})

createApp(App).use(router).mount('#app')
