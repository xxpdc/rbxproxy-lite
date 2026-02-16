const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // This part takes everything after your vercel domain and uses it as the URL
    const fullPath = req.url.split('/').slice(1).join('/');
    
    if (!fullPath) {
        return res.status(200).send("Proxy is online! Use a path like /games.roblox.com/v1/...");
    }

    try {
        // We add the https:// back here manually to ensure it's correct
        const response = await axios.get(`https://${fullPath}`);
        res.status(200).json(response.data);
    } catch (error) {
        // This is what you saw in your screenshot
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch from Roblox",
            message: error.message,
            attemptedUrl: `https://${fullPath}`
        });
    }
}
