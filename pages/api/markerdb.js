import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { endpoint, ...params } = req.query;
  if (!endpoint) {
    return res.status(400).json({ error: "Missing endpoint parameter" });
  }
  try {
    const response = await axios.get(endpoint, { params });
    res.status(200).json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json({ error: err.response.statusText, details: err.response.data });
    } else {
      res.status(500).json({ error: "Proxy error", details: err.message });
    }
  }
} 