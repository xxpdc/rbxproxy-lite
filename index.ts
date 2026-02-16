const axios = require('axios');

export default async function handler(req, res) {
    // Standard headers to allow Roblox to talk to the proxy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // Grabs everything after the .app/ in the URL
    const fullPath = req.url.split('/').slice(1).join('/');
    
    if (!fullPath) return res.status(200).send("Proxy is online!");

    try {
        // We use a clean target URL without manual slash manipulation
        const targetUrl = `https://${fullPath}`;

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Roblox/WinInet', // Makes the request look like it's from Roblox
                'Accept': 'application/json'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        // This will tell us EXACTLY what Roblox is complaining about
        res.status(error.response?.status || 500).json({
            error: "Roblox API Error",
            code: error.response?.status,
            message: error.message,
            attempted: `https://${fullPath}`
        });
    }
}
