export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sheetUrl = process.env.GOOGLE_SHEET_URL;

    if (!sheetUrl) {
        return res.status(500).json({ error: 'Server configuration error: Missing Sheet URL' });
    }

    try {
        // Forward the payload to the Google Apps Script / Sheet URL
        const response = await fetch(sheetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, timestamp: new Date().toISOString() })
        });

        if (!response.ok) {
            throw new Error('Failed to save to Google Sheet');
        }

        return res.status(200).json({ success: true, message: 'Subscribed successfully' });

    } catch (error) {
        console.error('Subscription Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
