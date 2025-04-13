import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage.vue'
import TestCasePage from './pages/TestCasePage.vue'
import TestingPage from './pages/TestingPage.vue'
import TestCaseInfoPage from './pages/TestCaseInfoPage.vue'
import RegistrationPage from './pages/RegistrationPage.vue'
import AuthPage from './pages/AuthPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Main',
      path: '/',
      component: MainPage,
    },
    {
      name: 'Cases',
      path: '/cases/:id',
      component: TestCasePage,
    },
    {
      name: 'Testing',
      path: '/testing',
      component: TestingPage,
    },
    {
      name: 'TestInfo',
      path: '/testInfo',
      component: TestCaseInfoPage,
    },
    {
      name: 'Registration',
      path: '/signup',
      component: RegistrationPage,
    },
    {
      name: 'Auth',
      path: '/signin',
      component: AuthPage,
    },
    {
      name: 'Settings',
      path: '/settings',
      component: SettingsPage,
    },
  ],
})

createApp(App).use(router).mount('#app')
