const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Grabs everything after your .app/ domain
    let path = req.url.split('/').slice(1).join('/');
    
    if (!path) return res.status(200).send("Proxy is active!");

    try {
        // Assembly of the target URL
        const targetUrl = `https://${path}`;

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.roblox.com/'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        // Returns the exact error from Roblox for debugging
        res.status(error.response?.status || 500).json({
            error: "Roblox API Error",
            code: error.response?.status,
            message: error.message
        });
    }
}
