const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Включение CORS
app.use(cors());

// Обработка запросов на /proxy
app.get('/proxy', async (req, res) => {
    // Формирование URL для запроса к API
    // Пример запроса: https://export-base.ru/api/company/?inn=0326008397&ogrn=1020300967642&key=xxxxxxxxxxxxxxx
    const apiUrl = `https://export-base.ru/api/company/?ogrn=1020300967642&key=66cb84e2bc25a2f`;

    try {
        // Запрос к внешнему API
        const response = await axios.get(apiUrl);
        return res.json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе к API:', error.message);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});