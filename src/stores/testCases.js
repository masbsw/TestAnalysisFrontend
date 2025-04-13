import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestCaseStore = defineStore('testCases', () => {
  const testCases = ref([])
  const currentTestCase = ref(null)

  const addTestCase = (testCase) => {
    testCases.value.push(testCase)
  }

  const setCurrentTestCase = (id) => {
    currentTestCase.value = testCases.value.find(tc => tc.id === id)
  }

  return {
    testCases,
    currentTestCase,
    addTestCase,
    setCurrentTestCase
  }
})