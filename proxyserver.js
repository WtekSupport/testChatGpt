const express = require('express');
const axios = require('axios');
const multer = require('multer');
const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });
app.post('/chatgpt', upload.single('file'), async (req, res) => {
    const { text, prompt } = req.body;
    const file = req.file;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo',
            prompt: `${prompt}\n${text}`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            },
        });
        res.json({ answer: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при обработке запроса' });
    }
});
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
