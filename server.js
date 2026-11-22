const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.prompt;
    // Si desde Roblox especificas un modelo, lo usa; si no, por defecto usa uno estándar compatible
    const modelName = req.body.model || "gpt-4o-mini"; 

    try {
        const aiResponse = await fetch('https://api.freellmapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer freellmapi-a9e4a1468bcc31b2588b694ee3f76059dd7332f8a1b49013'
            },
            body: JSON.stringify({
                model: modelName, 
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await aiResponse.json();
        
        if (data.choices && data.choices.length > 0) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "Respuesta inesperada de la IA", details: data });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Proxy listo en el puerto 3000'));
