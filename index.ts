const axios = require('axios');

module.exports = async (req, res) => {
    // This allows your Roblox game to talk to this proxy
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // We grab the Roblox URL from the end of your Vercel URL
    const robloxUrl = req.url.split('.app/')[1];
    
    if (!robloxUrl) {
        return res.status(400).send("No Roblox URL provided.");
    }

    try {
        const response = await axios.get(`https://${robloxUrl}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching from Roblox: " .. error.message);
    }
};
