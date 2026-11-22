const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.prompt;

    try {
        // Reemplaza esto con la URL real y el modelo que te proporcione FreeLLMAPI
        const aiResponse = await fetch('https://api.freellmapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TU_API_KEY_DE_FREELLMAPI'
            },
            body: JSON.stringify({
                model: "nombre-del-modelo-gratuito", 
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await aiResponse.json();
        const reply = data.choices[0].message.content;
        
        res.json({ reply: reply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Proxy listo en el puerto 3000'));