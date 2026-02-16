const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    let path = req.url.split('/').slice(1).join('/');
    if (!path) return res.status(200).send("Proxy is online!");

    try {
        let cleanPath = path.replace('games.roblox.com//', 'games.roblox.com/');
        const targetUrl = `https://${cleanPath}`;

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://www.roblox.com/'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Roblox API rejected the request",
            status: error.response?.status,
            message: error.message,
            fixedUrl: `https://${path.replace('games.roblox.com//', 'games.roblox.com/')}`
        });
    }
}
