const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api', async (req, res) => {
    try {
        const targetUrl = req.query.url;
        if (!targetUrl) {
            return res.status(400).json({ error: 'Missing url parameter' });
        }

        // Копируем все заголовки от клиента
        const headers = { ...req.headers };
        delete headers.host;
        delete headers.connection;

        const response = await fetch(targetUrl, {
            headers: headers
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('❌ Ошибка:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('✅ Сервер запущен на порту 3000!'));
