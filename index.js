const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/*', async (req, res) => {
    try {
        const url = 'https://api.football-data.org/v4' + req.url.replace('/api', '');
        console.log('📤 Запрос к API:', url);

        const response = await fetch(url, {
            headers: {
                'X-Auth-Token': '9ec6d6fe53864e81b6ca7f802926e838'
            }
        });

        const data = await response.json();
        console.log('📥 Ответ получен, статус:', response.status);

        // ПРОБРАСЫВАЕМ ТОЧНЫЙ СТАТУС И ДАННЫЕ
        res.status(response.status).json(data);

    } catch (error) {
        console.error('❌ Ошибка:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('✅ Сервер запущен!'));
