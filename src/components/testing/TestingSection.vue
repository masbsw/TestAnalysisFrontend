<template>
    <div class="flex-1">
        <div class="p-6">
            <h1 class="text-4xl text-white font-medium mb-6">Создание тест-кейса</h1>

            <div>
                <h4 class="font-normal text-2xl text-white text-center">Выберите формат материала</h4>

                <div class="grid grid-cols-2 gap-[20%] mb-16">
                    <button
                        @click="handleFileButtonClick(['.pdf', '.docx'], 'document')"
                        class="select py-4 text-black rounded hover:bg-white transition"
                    >
                        PDF/DOCX
                    </button>
                    <button
                        @click="handleFileButtonClick(['.png', '.jpg', '.jpeg'], 'image')"
                        class="select py-4 text-black rounded hover:bg-white transition"
                    >
                        PNG/JPEG
                    </button>
                    <button
                        @click="handleFileButtonClick(['.mp4', '.mov', '.avi'], 'video')"
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
            <div v-if="selectedFile" class="form flex-column items-center w-[60%] p-4 rounded-2xl">
                <div class="flex items-center gap-2 mb-4">
                    <div class="text-gray-500">
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
import axios from 'axios';
import { useRouter } from 'vue-router';

const fileInput = ref(null);
const selectedFile = ref(null);
const fileDescription = ref('');
const showTextInput = ref(false);
const textContent = ref('');
const currentFileType = ref('');
const router = useRouter();

const handleFileButtonClick = (extensions, fileType) => {
    showTextInput.value = false;
    currentFileType.value = fileType;
    const acceptString = extensions.map(ext => `${ext},${ext.toUpperCase()}`).join(',');
    fileInput.value.accept = acceptString;
    fileInput.value.click();
};

const handleTextButtonClick = () => {
    selectedFile.value = null;
    showTextInput.value = true;
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        showTextInput.value = false;
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
        const base64String = await readFileAsBase64(selectedFile.value);
        const payload = {
            description: fileDescription.value,
            base64_image: base64String,
            image_type: "image/jpg" 
        };

        console.log('Отправка данных на сервер:', payload);

        let response;
        if (currentFileType.value === 'document') {
            response = await axios.post('http://localhost:8001/process-document', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else if (currentFileType.value === 'image') {
            response = await axios.post('http://localhost:8001/generate-gherkin', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else if (currentFileType.value === 'video') {
            response = await axios.post('http://localhost:8001/process-video', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else if (currentFileType.value === 'text') {
            response = await axios.post('http://localhost:8001/process-text', {
                content: textContent.value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        console.log('Ответ от сервера:', response.data);

        router.push({
            name: 'TestCaseInfo',
            params: { index: response.data.id },
            query: { data: JSON.stringify(response.data) }
        });

        clearFile();
    } catch (error) {
        console.error('Ошибка при обработке файла:', error);
    }
};

const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const submitText = async () => {
    try {
        const response = await axios.post('http://localhost:8001/process-text', {
            content: textContent.value
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Ответ от сервера:', response.data);

        router.push({
            name: 'TestCaseInfo',
            params: { index: response.data.id },
            query: { data: JSON.stringify(response.data) }
        });

        clearTextInput();
    } catch (error) {
        console.error('Ошибка при обработке текста:', error);
    }
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
