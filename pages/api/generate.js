export default async function handler(req, res) {
    const { input, platform } = req.body;
  
    const prompt = `You are a social media expert. Repurpose the following content into a ${platform} with a strong hook, engaging structure, and a CTA.
  
  Content:
  ${input}
  
  Output:`;
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });
  
    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });
  }
  