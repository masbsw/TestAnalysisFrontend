<template>
    <div class="flex-1">
        <div class="p-6">
            <h2 class="text-4xl text-white font-medium mb-6">{{ testCase.title || 'Тест-кейс' }}</h2>
            <p class="text-2xl text-white font-normal mb-6">{{ testCase.description }}</p>
            
            <div class="bg-[#171630] p-8 rounded-xl">
                
                
                <!-- Для Gherkin сценариев -->
                <pre v-if="testCase.gherkin" class="text-white font-mono text-sm whitespace-pre-wrap">{{ testCase.gherkin }}</pre>
                
              
                
                <!-- Для простого текста -->
                <pre v-else-if="testCase.content" class="text-white font-mono text-sm whitespace-pre-wrap">{{ testCase.content }}</pre>
                
                
                <p v-else class="text-white">Нет данных для отображения</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const testCase = ref({});

onMounted(() => {
    testCase.value = history.state?.testCase || 
                     JSON.parse(localStorage.getItem('testCases') || '[]')
                        .find(tc => tc.id === route.params.id) || 
                     {};
});
</script>