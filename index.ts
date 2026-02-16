const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let path = req.url.split('/').slice(1).join('/');
    if (!path) return res.status(200).send("Proxy is online!");

    try {
        // This takes the clean path and fetches it from Roblox
        const response = await axios.get(`https://${path}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Roblox API Error",
            code: error.response?.status,
            message: error.message
        });
    }
}
