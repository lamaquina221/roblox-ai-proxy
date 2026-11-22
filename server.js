local HttpService = game:GetService("HttpService")

local PROXY_URL = "https://roblox-ai-proxy-qi5x.onrender.com/chat"

local function hablarConIA(mensaje, nombreModelo)
    local datos = {
        prompt = mensaje,
        model = nombreModelo or "gpt-4o-mini", -- Aquí pones el modelo que quieras usar
        apiKey = "TU_API_KEY_DE_FREELLMAPI"     -- (Opcional si ya la pusiste fija en el servidor)
    }
    
    local success, response = pcall(function()
        return HttpService:PostAsync(
            PROXY_URL,
            HttpService:JSONEncode(datos),
            Enum.HttpContentType.ApplicationJson
        )
    end)
    
    if success then
        local decoded = HttpService:JSONDecode(response)
        print("Respuesta (" .. nombreModelo .. "): ", decoded.reply)
        return decoded.reply
    else
        warn("Error de conexión: ", response)
        nil
    end
end

-- Ejemplos de uso cambiando de modelo al vuelo:
hablarConIA("Hola, ¿cuánto es 2+2?", "nombre-del-modelo-1")
hablarConIA("Escribe un poema corto", "nombre-del-modelo-2")
