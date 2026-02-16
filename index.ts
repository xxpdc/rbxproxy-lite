const axios = require('axios');

export default async function handler(req, res) {
    // Allows Roblox to communicate with the proxy
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Captures the Roblox path from the URL
    let fullPath = req.url.split('/').slice(1).join('/');
    
    if (!fullPath) {
        return res.status(200).send("Proxy is online! Use a path like /games.roblox.com/v1/...");
    }

    try {
        // Regex fix: Removes any double slashes (//) and replaces them with a single slash (/)
        // This fixes the 'https://games.roblox.com//v1/' error
        const cleanPath = fullPath.replace(/([^:]\/)\/+/g, "$1");
        const targetUrl = `https://${cleanPath}`;

        const response = await axios.get(targetUrl);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch from Roblox",
            message: error.message,
            attemptedUrl: `https://${fullPath}`
        });
    }
}
