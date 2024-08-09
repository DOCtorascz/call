const express = require('express');
const fetch = require('node-fetch');  // Импортирование node-fetch
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // или укажите конкретный домен
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Ваш API ключ
const API_KEY = 'a1bf2182e0734a2';
const BASE_URL = 'https://export-base.ru/api/new_company/';

app.get('/proxy', async (req, res) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const REG_DATE = yesterday.toISOString().split('T')[0];

    const apiUrl = `${BASE_URL}?main_okved_code=${req.query.okved}&id_region=${req.query.region}&key=${API_KEY}&limit=${req.query.limit}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка при запросе к удаленному API: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка при запросе к удаленному API');
    }
});

app.get('/proxySum', async (req, res) => {
    const apiUrl = `https://export-base.ru/api/balance/?key=${API_KEY}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка при запросе к удаленному API: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка при запросе к удаленному API');
    }
});

app.listen(port, () => {
    console.log(`Прокси-сервер запущен по адресу http://localhost:${port}`);
});