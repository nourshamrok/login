const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());

const KEY = 'remove secret';

app.get('/getRandomText', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: "Generate a random text" }],
                max_tokens: 50,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json({ text: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Error getting random text');
    }
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});
