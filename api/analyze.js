export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { input } = req.body;

    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    const systemPrompt = "You are MBridge AI, a strict institutional risk manager for Forex and Stocks. Analyze the user's input. If it is a trade rationale, check for emotional bias (FOMO, revenge, hope) and vague logic. If it is news, explain the impact on USD or S&P500. Output a verdict: 'APPROVED' or 'REJECTED' followed by a 1-2 sentence professional, stoic explanation. Keep it under 50 words. Be direct.";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: input }]
                }],
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            throw new Error('Upstream API request failed');
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Server Logic Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
