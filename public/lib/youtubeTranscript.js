import { YoutubeTranscript } from 'youtube-transcript';

export const fetchTranscriptFromYoutube = async (videoId) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcript.map((item) => item.text).join(' ');
    console.log(fullText)
    return fullText;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw new Error('Could not fetch transcript. Video may not have captions.');
  }
};