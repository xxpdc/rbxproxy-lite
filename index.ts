const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    let path = req.url.split('/').slice(1).join('/');
    if (!path) return res.status(200).send("Proxy is ready!");

    try {
        // ASSEMBLY: Connects to the new apis.roblox.com domain
        const targetUrl = `https://${path}`;

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Roblox/WinInet',
                'Accept': 'application/json'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Roblox API Error",
            message: error.message,
            tip: "Ensure you are using the apis.roblox.com endpoint"
        });
    }
}
