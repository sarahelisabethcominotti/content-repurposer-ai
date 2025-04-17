import { fetchTranscriptFromYoutube } from "@/public/lib/youtubeTranscript";

export default async function handler(req, res) {
    const { videoUrl } = req.body;
  
    const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
  
    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
  
    try {
      const transcript = await fetchTranscriptFromYoutube(videoId);
      res.status(200).json({ transcript });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }