<template>
    <div class="flex-1">
        <div class="p-6">
            <h1 class="text-4xl text-white font-medium mb-6">Создание тест-кейса</h1>

            <div>
                <h4 class="font-normal text-2xl text-white text-center">Выберите формат материала</h4>

                <div class="grid grid-cols-2 gap-[20%] mb-16">
                    <button 
                        @click="handleFileButtonClick(['.pdf', '.docx'])"
                        class="select py-4 text-black rounded hover:bg-white transition"
                    >
                        PDF/DOCX
                    </button>
                    <button 
                        @click="handleFileButtonClick(['.png', '.jpg', '.jpeg'])"
                        class="select py-4 text-black rounded hover:bg-white transition"
                    >
                        PNG/JPEG
                    </button>
                    <button 
                        @click="handleFileButtonClick(['.mp4', '.mov', '.avi'])"
                        class="select py-4 text-black rounded hover:bg-white transition"
                    >
                        Видео
                    </button>
                    <button 
                        @click="handleTextButtonClick"
                        class="select py-4 text-black rounded hover:bg-white transition"
                    >
                        Текст формата Selenium IDE, Playwright scripts
                    </button>
                </div>
            </div>

            <!-- Текстовый ввод -->
            <div v-if="showTextInput" class="form flex-column items-center w-[60%] p-4 rounded-2xl">
                <textarea 
                    v-model="textContent"
                    class="w-full p-2 border rounded"
                    placeholder="Введите текст..."
                ></textarea>
                <div class="flex justify-between gap-2 mt-2">
                    <button 
                        @click="clearTextInput"
                        class="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600 transition"
                    >
                        Отменить
                    </button>
                    <button 
                        @click="submitText"
                        class="px-4 py-2 bg-[#F2E9E9] text-black rounded hover:bg-[#D6D7E7] transition"
                    >
                        Отправить
                    </button>
                </div>
            </div>

            <!-- Форма с прикрепленным файлом -->
            <div v-if="selectedFile" class="form flex-column items-center w-[60%] p-4 rounded-2xl">
                <div class="flex items-center gap-2 mb-4">
                    <div class="text-gray-500">
                        <!-- Иконки остаются без изменений -->
                    </div>
                    <span>{{ selectedFile.name }}</span>
                </div>

                <textarea 
                    v-model="fileDescription"
                    class="w-full p-2 border rounded mb-4"
                    placeholder="Введите описание файла..."
                ></textarea>

                <div class="flex justify-between gap-2">
                    <button 
                        @click="clearFile"
                        class="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600 transition"
                    >
                        Отменить
                    </button>
                    <button 
                        @click="submitFile"
                        class="px-4 py-2 bg-[#F2E9E9] text-black rounded hover:bg-[#D6D7E7] transition"
                    >
                        Отправить
                    </button>
                </div>
            </div>

            <!-- Скрытый input для выбора файла -->
            <input 
                type="file" 
                ref="fileInput" 
                @change="handleFileSelect"
                class="hidden"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const selectedFile = ref(null);
const fileDescription = ref('');
const showTextInput = ref(false);
const textContent = ref('');

const handleFileButtonClick = (extensions) => {
    showTextInput.value = false; // Скрываем текстовую форму при выборе файла
    const acceptString = extensions.map(ext => `${ext},${ext.toUpperCase()}`).join(',');
    fileInput.value.accept = acceptString;
    fileInput.value.click();
};

const handleTextButtonClick = () => {
    selectedFile.value = null; // Скрываем файловую форму при выборе текста
    showTextInput.value = true;
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        showTextInput.value = false; // Гарантируем, что текстовая форма скрыта
    }
    event.target.value = '';
};

const clearFile = () => {
    selectedFile.value = null;
    fileDescription.value = '';
};

const clearTextInput = () => {
    showTextInput.value = false;
    textContent.value = '';
};

const submitFile = async () => {
    if (!selectedFile.value) return;

    try {
        // Читаем файл как base64
        const base64String = await readFileAsBase64(selectedFile.value);
        
        // Определяем правильный MIME type
        let mimeType;
        if (selectedFile.value.type) {
            mimeType = selectedFile.value.type;
        } else {
            // Если type недоступен, определяем по расширению
            const extension = selectedFile.value.name.split('.').pop().toLowerCase();
            mimeType = extension === 'jpg' || extension === 'jpeg' 
                ? 'image/jpeg' 
                : 'image/png';
        }

        // Формируем строку с префиксом
        const base64WithPrefix = `data:${mimeType};base64,${base64String}`;

        console.log('Отправка на сервер:', {
            image: base64WithPrefix,
            description: fileDescription.value
        });

        // Здесь будет реальный запрос на сервер
        // await fetch('/api/upload', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         image: base64WithPrefix,
        //         description: fileDescription.value
        //     }),
        // });

        clearFile();
    } catch (error) {
        console.error('Ошибка при обработке файла:', error);
    }
};

// Вспомогательная функция для чтения файла как base64
const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Удаляем префикс "data:*;base64," если он есть
            const base64String = reader.result.split(',')[1] || reader.result;
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const submitText = () => {
    console.log('Текст отправлен:', textContent.value);
    clearTextInput();
};
</script>

<style scoped>
.form {
    background-color: rgba(217, 217, 217, 0.7);
    margin-top: 70px;
}

.select {
    background-color: rgba(255, 255, 255, 0.66);
    margin-top: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.25s ease-out;
}

.select:hover {
    transform: translateY(-3px);
}
</style>