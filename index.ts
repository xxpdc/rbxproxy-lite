const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // This captures the Roblox URL after your domain
    const fullPath = req.url.split('/').slice(1).join('/');
    
    if (!fullPath) return res.status(200).send("Proxy is online!");

    try {
        // We use a clean GET request without extra headers that trigger 400 errors
        const response = await axios.get(`https://${fullPath}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Roblox API Error",
            code: error.response?.status,
            message: error.message,
            attempted: `https://${fullPath}`
        });
    }
}
