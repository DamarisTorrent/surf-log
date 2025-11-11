import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Get the path after /api/noaa/
  const path = req.url?.replace('/api/noaa/', '') || '';

  // Construct the NOAA URL
  const noaaUrl = `https://www.ndbc.noaa.gov/${path}`;

  console.log(`[Vercel API] Proxying request to: ${noaaUrl}`);

  try {
    const response = await fetch(noaaUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SurfLog/1.0)',
      },
    });

    const data = await response.text();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return the data
    res.status(response.status).send(data);
  } catch (error) {
    console.error('[Vercel API] Error:', error);
    res.status(500).json({ error: 'Failed to fetch from NOAA' });
  }
}
