const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;


app.get('/api/marketcap', async (req, res) => {
    const { tokenAddress } = req.query;

    if (!tokenAddress) {
        return res.status(400).json({ error: 'Token address is required' });
    }

    const url = `https://pump.fun/coin/${tokenAddress}`;

    try {
     
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const marketCapElement = $('div.text-sm.text-green-300.flex.gap-2');

        const marketCapText = marketCapElement.text().trim();
        const marketCapMatch = marketCapText.match(/\$([0-9,\.]+)/); 

        if (marketCapMatch) {
            const marketCap = marketCapMatch[1];
            return res.json({ marketCap: `$${marketCap}` });
        } else {
            return res.status(404).json({ error: 'Market cap not found' });
        }
    } catch (error) {
        console.error('Error fetching the market cap:', error.message);
        return res.status(500).json({ error: 'Error fetching data from the server' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
