const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful university assistant. Provide clear, concise explanations for academic concepts." 
        },
        { role: "user", content: question }
      ],
      temperature: 0.7,
    });

    res.json({ 
      answer: response.data.choices[0].message.content 
    });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to process question' });
  }
};