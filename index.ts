const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // 1. Get the path after your Vercel domain
    let path = req.url.split('/').slice(1).join('/');
    
    if (!path) return res.status(200).send("Proxy is online!");

    try {
        // 2. MANUAL CLEANUP: This specifically targets and removes the double slash
        // it turns "games.roblox.com//v1" into "games.roblox.com/v1"
        let cleanPath = path.replace('games.roblox.com//', 'games.roblox.com/');
        
        // 3. Final URL assembly
        const targetUrl = `https://${cleanPath}`;

        const response = await axios.get(targetUrl);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch from Roblox",
            message: error.message,
            fixedUrl: `https://${path.replace('games.roblox.com//', 'games.roblox.com/')}`
        });
    }
}
