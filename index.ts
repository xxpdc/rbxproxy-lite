const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // We get the path after your domain (e.g., /games.roblox.com/v1/...)
    const path = req.url.split('/').slice(1).join('/');
    
    if (!path) {
        return res.status(200).send("Proxy is active! Use a Roblox API path to fetch data.");
    }

    try {
        const response = await axios.get(`https://${path}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from Roblox", message: error.message });
    }
}
