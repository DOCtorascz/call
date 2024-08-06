const express = require('express');
const fetch = require('node-fetch');  // Импортирование node-fetch
const app = express();
const port = 3000;

// Ваш API ключ
const API_KEY = '66cb84e2bc25a2f';
const BASE_URL = 'https://export-base.ru/api/company/';

app.get('/proxy', async (req, res) => {
    const ogrn = req.query.ogrn || '1020300967642';  // Параметр по умолчанию, если не указан

    const apiUrl = `${BASE_URL}?ogrn=${ogrn}&key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка при запросе к удаленному API: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
        console.log('пришёл')
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка при запросе к удаленному API');
    }
});

app.listen(port, () => {
    console.log(`Прокси-сервер запущен по адресу http://localhost:${port}`);
});