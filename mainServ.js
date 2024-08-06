const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3000;

// Включение CORS
app.use(cors());

// Обработка запросов на /proxy
app.get('/proxy', async (req, res) => {
    const apiUrl = `https://export-base.ru/api/company/?ogrn=1020300967642&key=66cb84e2bc25a2f`;

    try {
        // Импортируем fetch динамически
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
        const agent = new https.Agent({ rejectUnauthorized: false });
        const response = await fetch(apiUrl, { agent });

        if (!response.ok) {
            throw new Error('Ошибка при запросе к API');
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error('Ошибка при запросе к API:', error.message);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});