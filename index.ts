const axios = require('axios');

export default async function handler(req, res) {
    // Allows Roblox to talk to the proxy
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // This grabs everything after your Vercel URL
    let fullPath = req.url.split('/').slice(1).join('/');
    
    if (!fullPath) {
        return res.status(200).send("Proxy is online!");
    }

    try {
        // CLEANUP: This removes any double slashes
        const cleanPath = fullPath.replace(/([^:]\/)\/+/g, "$1");
        const targetUrl = `https://${cleanPath}`;

        const response = await axios.get(targetUrl);
        res.status(200).json(response.data);
    } catch (error) {
        // Sends the exact Roblox error back to you for debugging
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch from Roblox",
            message: error.message,
            attemptedUrl: `https://${fullPath}`
        });
    }
}
