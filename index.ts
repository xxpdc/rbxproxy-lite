const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Grabs the path from the URL
    let fullPath = req.url.split('/').slice(1).join('/');
    if (!fullPath) return res.status(200).send("Proxy is ready!");

    try {
        // ASSEMBLY: We use the new Catalog V2 parameters to avoid the 400 error
        const targetUrl = `https://${fullPath}`;

        const response = await axios.get(targetUrl, {
            headers: {
                // This makes the proxy look like the actual Roblox app
                'User-Agent': 'Roblox/WinInet',
                'Accept': 'application/json'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        // Detailed error reporting so we know exactly why Roblox said "No"
        res.status(error.response?.status || 500).json({
            error: "Roblox Rejected Request",
            code: error.response?.status,
            message: error.message,
            tip: "Check if CreatorType=1 is in your URL"
        });
    }
}
