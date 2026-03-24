export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key) return res.status(500).json({ error: 'Places API not configured' });
  const { q, place_id, type = 'autocomplete' } = req.query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    let url;
    if (type === 'autocomplete') {
      if (!q) return res.status(400).json({ error: 'Missing q' });
      url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(q)}&types=address&key=${key}`;
    } else if (type === 'details') {
      if (!place_id) return res.status(400).json({ error: 'Missing place_id' });
      url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(place_id)}&fields=formatted_address,address_components,geometry&key=${key}`;
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }
    const r = await fetch(url);
    const data = await r.json();
    res.setHeader('Cache-Control', `public, s-maxage=${type === 'autocomplete' ? 300 : 86400}`);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
