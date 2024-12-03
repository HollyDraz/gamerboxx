import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;
const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const BASE_URL = 'https://www.giantbomb.com/api/';

app.use(cors());

app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await fetch(`${BASE_URL}search/?api_key=${API_KEY}&format=json&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Giant Bomb API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
